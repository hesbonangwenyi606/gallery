const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let upload = require('./upload'); // Assuming this is your upload logic
let Image = require('../models/images');

// Use async function for the route to fetch images
router.get('/', async (req, res) => {
    try {
        // Use await to handle the promise returned by Image.find()
        const images = await Image.find({});
        
        // Check if images are returned
        if (!images || images.length === 0) {
            console.log("No images found in the database.");
            return res.render('index', { images: [], msg: 'No images available' });
        }

        // Render the images in the view
        res.render('index', { images: images, msg: req.query.msg });
    } catch (err) {
        console.log(err); // Log error for debugging
        res.status(500).send("Error fetching images"); // Respond with server error
    }
});

// Use async function for the upload route
router.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.redirect(`/?msg=${err}`); // Redirect if there's an error
        } else {
            console.log(req.file); // Log the uploaded file for debugging

            if (req.file == undefined) {
                res.redirect('/?msg=Error: No file selected!'); // Redirect if no file was uploaded
            } else {
                // Create a new image object
                let newImage = new Image({
                    name: req.file.filename,
                    size: req.file.size,
                    path: 'images/' + req.file.filename
                });

                try {
                    // Save the image to the database and wait for the save to complete
                    await newImage.save();
                    res.redirect('/?msg=File uploaded successfully');
                } catch (saveErr) {
                    console.log(saveErr); // Log error for debugging
                    res.status(500).send("Error saving image to database"); // Respond with server error
                }
            }
        }
    });
});

module.exports = router;
