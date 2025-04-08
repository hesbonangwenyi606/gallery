pipeline {
    agent any

    environment {
        SLACK_CHANNEL = '#hesbon_IP1' // <-- Update to your real Slack channel name
        SLACK_CREDENTIALS_ID = 'slack-token' // <-- Must be set in Jenkins credentials
        RENDER_DEPLOY_URL = 'https://your-render-app.onrender.com' // <-- Update with real Render URL
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/hesbonangwenyi606/gallery'
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
                        mail to: 'hesbonmanyinsa96@gmail.co ' 
                             subject: "Test Failure in Jenkins Build #${env.BUILD_NUMBER}", 
                             body: "Tests failed in Jenkins build #${env.BUILD_NUMBER}. Please check the logs at: ${env.BUILD_URL}"
                        error('Tests failed')
                    }
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                echo 'Render deploy is handled via GitHub auto-deploy.'
                // Optional: trigger a Render deploy webhook here
                // sh 'curl -X POST https://api.render.com/deploy/some-webhook'
            }
        }

        stage('Notify Slack') {
            steps {
                slackSend channel: env.SLACK_CHANNEL, 
                          credentialsId: env.SLACK_CREDENTIALS_ID, 
                          message: "✅ *Build #${env.BUILD_NUMBER}* deployed successfully!\n🔗 ${env.RENDER_DEPLOY_URL}", 
                          color: 'good'
            }
        }
    }
}
