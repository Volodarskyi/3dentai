pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'your-dockerhub-username/your-app' // Replace with your Docker Hub repo
        DEPLOY_SERVER = 'your-ec2-instance-ip'            // Replace with the EC2 instance IP
        DEPLOY_USER = 'ubuntu'                            // Adjust based on your instance's user
        SSH_KEY = '/path/to/your/private-key.pem'         // Path to your SSH private key
        IMAGE_TAG = 'latest'                              // Rollback to the last stable image tagged as 'latest'
    }

    stages {
        stage('Rollback to Last Stable') {
            steps {
                script {
                    // SSH into the EC2 instance and revert to the latest stable Docker image
                    sshagent(['your-jenkins-ssh-credentials-id']) {
                        sh """
                        ssh -i ${SSH_KEY} ${DEPLOY_USER}@${DEPLOY_SERVER} << EOF
                            # Pull the latest stable Docker image
                            docker pull ${DOCKER_IMAGE}:${IMAGE_TAG}

                            # Update Docker Compose file to use the 'latest' tag for rollback
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
            echo "Rollback successful: ${DOCKER_IMAGE}:${IMAGE_TAG}"
        }
        failure {
            echo "Rollback failed for ${DOCKER_IMAGE}:${IMAGE_TAG}."
        }
    }
}
