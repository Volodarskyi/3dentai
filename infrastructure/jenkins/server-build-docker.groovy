pipeline {
    agent {
        kubernetes {
            yaml """
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: jnlp
                image: jenkins/inbound-agent:latest
                resources:
                  requests:
                    memory: "4Gi"
                    cpu: "4"
                  limits:
                    memory: "8Gi"
                    cpu: "6"
                volumeMounts:
                - name: workspace-volume
                  mountPath: /workspace
              - name: docker
                image: docker:20.10.6-dind
                securityContext:
                  privileged: true
                volumeMounts:
                - name: docker-graph-storage
                  mountPath: /var/lib/docker
                - name: workspace-volume
                  mountPath: /workspace
                - name: dockerhub-secret
                  mountPath: /root/.docker/config.json
                  subPath: .dockerconfigjson
              volumes:
              - name: workspace-volume
                emptyDir: {}
              - name: docker-graph-storage
                emptyDir: {}
              - name: dockerhub-secret
                secret:
                  secretName: dockerhub-secret
            """
        }
    }

    environment {
        DOCKER_HUB_TOKEN = credentials('dockerhub-token')
        DOCKER_IMAGE = 'oleksiipasichnyk/confl:hackaton-server'
        K8S_MANIFEST_PATH = 'infrastructure/kubernetes-configs/dev/server/server-deployment.yaml'
        REPO_URL = 'git@github.com:Volodarskyi/3dentai.git'
        GIT_SSH_KEY = credentials('github-ssh-key')
        SERVER_DIR = 'server'
        WORKSPACE_DIR = "${env.WORKSPACE}"
    }
    
    parameters {
        string(name: 'DOCKER_IMAGE_BASE', defaultValue: 'oleksiipasichnyk/confl', description: 'Base Docker image name')
        string(name: 'K8S_NAMESPACE', defaultValue: 'hackaton-argo', description: 'Kubernetes namespace')
        string(name: 'COMMIT_AUTHOR_EMAIL', defaultValue: 'pasichnykoleksa@gmail.com', description: 'Email for commit author')
        string(name: 'COMMIT_AUTHOR_NAME', defaultValue: 'Jenkins-PasichnykOleksa', description: 'Name for commit author')
        string(name: 'BUILD_BRANCH', defaultValue: 'develop', description: 'Branch to build Docker image from')
    }

    triggers {
        pollSCM('H/5 * * * *')  // Polling the repository every 5 minutes
    }

    stages {
        stage('Install Git') {
            steps {
                container('docker') {
                    sh 'apk add --no-cache git'
                }
            }
        }

        stage('Full Repository Checkout') {
            steps {
                container('jnlp') {
                    sshagent(credentials: ['github-ssh-key']) {
                        script {
                            sh """
                            mkdir -p ~/.ssh
                            echo "Host github.com\\n\\tStrictHostKeyChecking no\\n" >> ~/.ssh/config
                            git config --global --add safe.directory ${WORKSPACE_DIR}
                            cd ${WORKSPACE_DIR}
                            git init
                            git remote remove origin || true
                            git remote add origin ${REPO_URL}
                            git fetch --depth=1 origin ${params.BUILD_BRANCH}
                            git checkout ${params.BUILD_BRANCH}
                            """
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                container('docker') {
                    script {
                         sh """
                        git config --global --add safe.directory ${WORKSPACE_DIR}
                        """
                        def commitHash = sh(script: "cd ${WORKSPACE_DIR} && git rev-parse --short HEAD", returnStdout: true).trim()
                        def date = sh(script: "date +%Y%m%d", returnStdout: true).trim()
                        env.IMAGE_TAG = "${params.DOCKER_IMAGE_BASE}:${params.K8S_NAMESPACE}-${commitHash}-${date}"

                        sh """
                        cd ${WORKSPACE_DIR}/${SERVER_DIR}
                        docker build -t ${IMAGE_TAG} .
                        """
                    }
                }
            }
        }

        stage('Push Docker Image to DockerHub') {
            steps {
                container('docker') {
                    script {
                        sh """
                        docker push ${IMAGE_TAG}
                        """
                    }
                }
            }
        }

        stage('Get Commit Hash and Date') {
            steps {
                container('jnlp') {
                    script {
                        env.commitHash = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                        env.date = sh(script: "date +%Y%m%d", returnStdout: true).trim()
                    }
                }
            }
        }

        stage('Update Kubernetes Manifest') {
            steps {
                container('jnlp') {
                    script {
                        def manifestPath = "${WORKSPACE_DIR}/infrastructure/kubernetes-configs/dev/server/server-deployment.yaml"

                        sh """
                        git config --global user.email "${params.COMMIT_AUTHOR_EMAIL}"
                        git config --global user.name "${params.COMMIT_AUTHOR_NAME}"
                        if [ -f ${manifestPath} ]; then
                            sed -i 's|image: ${params.DOCKER_IMAGE_BASE}:.*|image: ${IMAGE_TAG}|' ${manifestPath}
                            git add ${manifestPath}
                            git commit -m "Update image tag to ${IMAGE_TAG} in Kubernetes manifest"
                        else
                            echo "ERROR: ${manifestPath} not found"
                            exit 1
                        fi
                        """
                    }
                }
            }
        }

        stage('Rebase and Push to Deploy Branch') {
            steps {
                container('jnlp') {
                    dir("${WORKSPACE_DIR}/${SERVER_DIR}") {
                        script {
                            sshagent(credentials: ['github-ssh-key']) {
                                sh """
                                git fetch origin
                                git checkout -B deploy origin/deploy
                                git pull origin deploy
                                git add infrastructure/kubernetes-configs/dev/server/server-deployment.yaml
                                if ! git diff --cached --exit-code > /dev/null; then
                                    git commit -m "Update image tag to ${IMAGE_TAG}"
                                else
                                    echo "No changes to commit."
                                fi
                                git rebase origin/${params.BUILD_BRANCH}
                                git push --force origin deploy
                                """
                            }
                        }
                    }
                }
            }
        }
    }
}
