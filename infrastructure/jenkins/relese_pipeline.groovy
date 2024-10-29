pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'your-dockerhub-username/your-app' // Replace with your Docker Hub repo
        DEPLOY_SERVER = 'your-ec2-instance-ip'            // Replace with the EC2 instance IP
        DEPLOY_USER = 'ubuntu'                            // Adjust based on your instance's user
        SSH_KEY = '/path/to/your/private-key.pem'         // Path to your SSH private key
        IMAGE_TAG = 'v1.0'                                // Replace with the specific version tag to deploy
    }

    stages {
        stage('Deploy to EC2') {
            steps {
                script {
                    // SSH into the EC2 instance and update the Docker containers
                    sshagent(['your-jenkins-ssh-credentials-id']) {
                        sh """
                        ssh -i ${SSH_KEY} ${DEPLOY_USER}@${DEPLOY_SERVER} << EOF
                            # Pull the specified Docker image version
                            docker pull ${DOCKER_IMAGE}:${IMAGE_TAG}

                            # Update the Docker Compose file and deploy
                            cd /path/to/your/docker-compose/directory
                            sed -i 's|image: ${DOCKER_IMAGE}:.*|image: ${DOCKER_IMAGE}:${IMAGE_TAG}|' docker-compose.yml
                            docker-compose up -d
                        EOF
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful: ${DOCKER_IMAGE}:${IMAGE_TAG}"
        }
        failure {
            echo "Deployment failed for ${DOCKER_IMAGE}:${IMAGE_TAG}."
        }
    }
}
