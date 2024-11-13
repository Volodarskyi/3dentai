pipeline {
    agent any

    parameters {
        string(name: 'ACTION', defaultValue: 'apply', description: 'Terraform action to take (e.g., apply, destroy)')
        choice(name: 'ANSIBLE_CONFIRM', choices: ['yes', 'no'], description: 'Run Ansible immediately or wait for confirmation?')
        string(name: 'TF_DIRECTORY', defaultValue: '/infrastructure/bootstrap/terraform', description: 'Path to Terraform configuration directory')
        string(name: 'ANSIBLE_DIRECTORY', defaultValue: '/infrastructure/bootstrap/ansible', description: 'Path to Ansible configuration directory')
    }

    tools {
        terraform 'tf1.6'
    }

    environment {
        GIT_REPO = 'https://github.com/Volodarskyi/3dentai'
        GIT_BRANCH = 'deploy'
        GIT_CREDENTIALS = 'jenkins_access_to_git'  // Replace with your Jenkins Git credentials ID
        AWS_REGION = 'us-east-1'                    // AWS region for Terraform
        INSTANCE_SSH_KEY_NAME = 'access_for_new_node_js_app'              // SSH key name in AWS (replace as necessary)
        ANSIBLE_HOST_KEY_CHECKING = 'False'         // Disable host key checking for Ansible
    }

    stages {

        stage('Clone Git Repository') {
            steps {
                checkout scm: [
                    $class: 'GitSCM',
                    branches: [[name: "${GIT_BRANCH}"]],
                    userRemoteConfigs: [[
                        url: "${GIT_REPO}",
                        credentialsId: "${GIT_CREDENTIALS}"
                    ]]
                ]
            }
        }

        stage('Terraform Init & Plan') {
            steps {
                dir("${params.TF_DIRECTORY}") {
                    sh '''
                    terraform init -input=false
                    terraform plan -out=terraform.tfplan
                    '''
                }
            }
        }

        stage('User Approval') {
            steps {
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        def userInput = input(
                            id: 'userInput', 
                            message: 'Proceed with Terraform apply?', 
                            parameters: [choice(name: 'Proceed?', choices: ['yes', 'abort'], description: 'Proceed or Abort')]
                        )
                        if (userInput == 'abort') {
                            error('Build was aborted by the user.')
                        }
                    }
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir("${params.TF_DIRECTORY}") {
                    sh "terraform ${params.ACTION} -auto-approve terraform.tfplan"
                }
            }
        }

        stage('Get Terraform Outputs') {
            steps {
                dir("${params.TF_DIRECTORY}") {
                    script {
                        def instance_ip = sh(script: 'terraform output -raw instance_ip', returnStdout: true).trim()
                        writeFile file: "${params.ANSIBLE_DIRECTORY}/instance_ip.txt", text: instance_ip
                    }
                }
            }
        }

        stage('Install Ansible') {
            steps {
                sh '''
                sudo apt-add-repository --yes --update ppa:ansible/ansible
                sudo apt-get install ansible -y
                '''
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: "${params.INSTANCE_SSH_KEY_NAME}", keyFileVariable: 'SSH_KEY')]) {
                    dir("${params.ANSIBLE_DIRECTORY}") {
                        script {
                            timeout(time: 5, unit: 'MINUTES') {
                                def userConfirmation = input(
                                    id: 'ConfirmAnsibleRun', 
                                    message: 'Confirm Ansible playbook run immediately or wait for timeout to pass:',
                                    parameters: [choice(name: 'Confirm', choices: ['yes', 'no'], description: 'Confirm to run Ansible')],
                                    defaultValue: 'yes'
                                )
                                if (userConfirmation == 'no') {
                                    error('Ansible playbook run was aborted by the user.')
                                }
                            }
                                                
                            sh '''
                            ansible-playbook -i instance_ip.txt playbook.yaml -u ubuntu --private-key='$SSH_KEY' -e 'ansible_ssh_common_args="-o StrictHostKeyChecking=no"'
                            '''
                        }
                    }
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
            dir("${params.TF_DIRECTORY}") {
                sh 'terraform destroy -auto-approve'
            }
        }
    }
}
