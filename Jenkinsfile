pipeline {
    agent any
    environment {
        SLACK_CHANNEL = '#your-slack-channel'
        SLACK_CREDENTIALS_ID = 'slack-token'
        RENDER_DEPLOY_URL = 'https://your-render-app.onrender.com'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/hesbonangwenyi606/gallery'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    try {
                        sh 'npm test'
                    } catch (Exception e) {
                        mail to: 'your-email@example.com', 
                             subject: 'Test Failure in Jenkins Build ${env.BUILD_NUMBER}', 
                             body: 'Tests failed. Check Jenkins logs for details.'
                        error('Tests failed')
                    }
                }
            }
        }
        
        stage('Deploy to Render') {
            steps {
                sh 'node server.js &'
            }
        }
        
        stage('Notify Slack') {
            steps {
                slackSend channel: env.SLACK_CHANNEL, 
                          credentialsId: env.SLACK_CREDENTIALS_ID, 
                          message: "Deployment successful! Build #${env.BUILD_NUMBER}. Check it out at ${env.RENDER_DEPLOY_URL}", 
                          color: 'good'
            }
        }
    }
}
