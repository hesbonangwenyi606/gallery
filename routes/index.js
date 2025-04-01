const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let upload = require('./upload');
const url = require('url');
let Image = require('../models/images');

// Use async function for the route
router.get('/', async (req, res) => {
    try {
        // Use await to handle the promise returned by Image.find()
        const images = await Image.find({});
        res.render('index', { images: images, msg: req.query.msg });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching images");
    }
});

// Use async function for the upload route
router.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.redirect(`/?msg=${err}`);
        } else {
            console.log(req.file);

            if (req.file == undefined) {
                res.redirect('/?msg=Error: No file selected!');
            } else {
                // Create a new image
                let newImage = new Image({
                    name: req.file.filename,
                    size: req.file.size,
                    path: 'images/' + req.file.filename
                });

                try {
                    // Use await to save the image to the database
                    await newImage.save();
                    res.redirect('/?msg=File uploaded successfully');
                } catch (saveErr) {
                    console.log(saveErr);
                    res.status(500).send("Error saving image to database");
                }
            }
        }
    });
});

module.exports = router;
