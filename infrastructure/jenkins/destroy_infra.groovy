pipeline {
    agent any
    parameters {
        booleanParam(name: 'DESTROY', defaultValue: false, description: 'Set to true to destroy the infrastructure')
    }
    environment {
        AWS_REGION = 'us-east-1'                       // AWS region for Terraform
        INSTANCE_SSH_KEY_NAME = 'access_for_new_node_js_app'              // SSH key name in AWS (replace as necessary)
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
        stage('Terraform Plan Destroy') {
            steps {
                script {
                    dir('terraform') {
                        sh '''
                        terraform init -input=false
                        terraform plan -destroy -out=terraform_destroy.tfplan'
                        '''
                    }
                }
            }
        },
        stage('Terraform Destroy') {
            when {
                expression { return params.DESTROY }
            }
            steps {
                script {
                    dir('terraform') {
                        sh 'terraform apply -auto-approve terraform_destroy.tfplan'
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully."
        }
        failure {
            echo "Pipeline failed."
        }
    }
}
