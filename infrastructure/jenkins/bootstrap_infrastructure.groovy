pipeline {
    agent any
    environment {
        AWS_REGION = 'us-east-1'                       // AWS region for Terraform
        TF_VAR_ssh_key_name = 'my-key'                 // SSH key name for the instance (already set up in AWS)
        ANSIBLE_HOST_KEY_CHECKING = 'False'            // Disable host key checking for Ansible
        SSH_KEY_PATH = '/path/to/your/private-key.pem' // Path to SSH private key
    }

    stages {
        stage('Terraform Init') {
            steps {
                script {
                    dir('terraform') { // Navigate to the Terraform configuration directory
                        sh 'terraform init'
                    }
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                script {
                    dir('terraform') {
                        sh 'terraform apply -auto-approve'
                    }
                }
            }
        }

        stage('Ansible Setup') {
            steps {
                script {
                    // Fetch the public IP output from Terraform
                    def instance_ip = sh(script: "terraform output -raw instance_ip", returnStdout: true).trim()

                    // Generate an Ansible inventory dynamically
                    writeFile file: 'inventory.ini', text: """
                    [app_instance]
                    ${instance_ip} ansible_user=ubuntu ansible_ssh_private_key_file=${SSH_KEY_PATH}
                    """

                    // Run the Ansible playbook to configure the instance
                    sh 'ansible-playbook -i inventory.ini ansible/setup.yml'
                }
            }
        }
    }

    post {
        success {
            echo "Infrastructure setup and instance configuration successful."
        }
        failure {
            echo "Failed to set up infrastructure or configure the instance."
            // Optionally, you can add terraform destroy here to clean up if the setup fails
            dir('terraform') {
                sh 'terraform destroy -auto-approve'
            }
        }
    }
}
