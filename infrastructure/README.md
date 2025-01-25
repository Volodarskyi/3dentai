
# Hackaton Server CI/CD Pipeline

This repository contains the infrastructure and configuration for the continuous integration and deployment (CI/CD) pipeline of the **Hackaton Server** project. The pipeline is configured to build, push, and deploy Docker images to Kubernetes using Jenkins.

## DevOps Setup

### 1. Kubernetes Environment

This project is deployed in a Kubernetes environment, meaning that configurations for the services, deployments, and other Kubernetes objects are stored in the `kubernetes-configs` folder. You can find the manifest files for deployment, service, and ingress under:

```
server/kubernetes-configs/
```

### 2. Jenkins Pipeline

The CI/CD pipeline for this project is built using Jenkins, and it is responsible for:

1. **Building Docker Images**: When a new commit is pushed to the main branch, the Docker image is built using the Dockerfile in the `server` directory.
2. **Pushing Docker Images to DockerHub**: Once the Docker image is built, it is pushed to DockerHub using credentials provided in the Jenkins environment. The image tag consists of the following format:
   
   ```
   oleksiipasichnyk/confl:hackaton-server-<commit-hash>-<date>
   ```

   - **commit-hash**: The short version of the current Git commit hash.
   - **date**: The current date in `YYYYMMDD` format.

3. **Updating Kubernetes Manifest**: The pipeline will automatically update the Kubernetes deployment manifest with the newly built image tag. The updated manifest is then committed and pushed to the `deploy` branch.

4. **Deploy Branch Management**: After committing the changes, the pipeline ensures that the `deploy` branch is kept in sync with `main` by performing a rebase and force-pushing the updated manifest with the new Docker image tag.

### Pipeline Workflow

The pipeline defined in the Jenkinsfile performs the following tasks:

- **Sparse Checkout Setup**: Only necessary files are checked out using sparse checkout, reducing the amount of data cloned.
- **Git Operations**: Using SSH keys, Jenkins is configured to interact with the GitHub repository to pull and push changes.
- **Docker Build and Push**: The Docker image is built in a Docker-in-Docker (DinD) setup and pushed to DockerHub.
- **Kubernetes Manifest Update**: The deployment manifest is updated with the new Docker image tag.
- **Rebase and Push to Deploy Branch**: The updated manifest is committed to the `deploy` branch, and the branch is rebased on top of `main` to keep it in sync.

### Jenkinsfile Overview

Here is a high-level overview of the stages in the Jenkins pipeline:

1. **Install Git**: Ensures Git is installed in the container.
2. **Sparse Checkout Setup**: Configures sparse checkout to pull only required files from the repository.
3. **Build Docker Image**: Builds the Docker image based on the current commit and date.
4. **Push Docker Image**: Pushes the Docker image to DockerHub using stored credentials.
5. **Update Kubernetes Manifest**: Modifies the Kubernetes deployment manifest to use the new Docker image.
6. **Rebase and Push to Deploy Branch**: Rebases the `deploy` branch on top of `main` and pushes the updated manifest.

### DockerHub Access

DockerHub access is handled via secrets stored in Kubernetes, specifically:

```yaml
name: dockerhub-secret
```

This secret contains the necessary authentication for DockerHub and is mounted as a config file (`config.json`) in the pipeline's Docker container.

### Prerequisites

To get this pipeline running, ensure the following are set up:

- **Jenkins**: Jenkins with Kubernetes plugin configured.
- **Kubernetes Cluster**: The pipeline is intended to be run in a Kubernetes environment.
- **DockerHub Account**: The pipeline pushes images to DockerHub, so valid credentials are required.
- **SSH Key**: SSH key access to the GitHub repository must be provided in the Jenkins credentials store.

### Troubleshooting

- **Permission Issues**: Ensure that the Jenkins agent containers have the correct permissions to perform Docker operations and access the necessary files.
- **No Changes to Commit**: If no changes are made to the Kubernetes manifest, the pipeline will skip the commit and proceed with the rebase and push.
- **Sparse Checkout Errors**: If files are missing during the checkout process, verify that the sparse checkout configuration is correct.

### Author

- **Oleksii Pasichnyk** - DevOps Engineer
