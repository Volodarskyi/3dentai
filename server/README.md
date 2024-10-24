# Project Name

## Overview
This project is deployed within a Kubernetes environment and is continuously integrated and delivered via Jenkins, which handles Docker builds, pushes to DockerHub, and deployment updates for Kubernetes.

---

## DevOps Setup

### 1. Kubernetes Deployment

This server is deployed within a Kubernetes (K3s) environment, which means that the configuration files required to manage and deploy the application are stored in the `kubernetes-configs` folder.

- All Kubernetes manifests, including the deployment files and service definitions, are kept in this directory.
- Image updates and other configurations are handled automatically through Jenkins as described below.
- The Kubernetes manifests contain placeholders for image tags, which are updated dynamically during the build and deployment process.

### 2. Jenkins Pipeline and Docker Integration

The CI/CD pipeline is configured in Jenkins to automate the build, push, and deployment of the Docker image.

#### Jenkinsfile Description:
- The Jenkins pipeline is triggered via SCM polling every 5 minutes to check for changes in the **main** branch of the GitHub repository.
- The pipeline builds a Docker image using the `Dockerfile` present in the repository.
  - The Docker image tag follows a specific format: `oleksiipasichnyk/confl:hackaton-server-<commit-hash>-<date>`.
  - The `<commit-hash>` is the shortened Git commit hash from the latest commit.
  - The `<date>` is formatted as `YYYYMMDD` to represent the date when the build occurred.
  
- The Jenkinsfile is configured to run on a Kubernetes pod with:
  - **4 vCPUs** as the request, and **8 vCPUs** as the limit.
  - Memory limits of **4GiB** request and **8GiB** limit.
  
- **Docker Image Push**:
  - The built Docker image is pushed to **DockerHub** using credentials stored as Jenkins secrets. The image is pushed with the generated tag (`<commit-hash>-<date>`).

#### Pipeline Stages:
1. **Checkout**: The pipeline checks out the latest code from the `main` branch of the GitHub repository using an SSH key for authentication.
2. **Build Docker Image**: The pipeline builds the Docker image with the format `oleksiipasichnyk/confl:hackaton-server-<commit-hash>-<date>`.
3. **Push Docker Image to DockerHub**: The Docker image is pushed to DockerHub using Jenkins' secret credentials.
4. **Update Kubernetes Manifest**: The Kubernetes manifest (`kubernetes-configs/manifest.yaml`) is updated to reference the new Docker image tag.
5. **Push Changes to Deploy Branch**: The updated Kubernetes manifest is committed and pushed to the `deploy` branch of the GitHub repository.

#### Polling Configuration:
- The pipeline uses SCM polling every 5 minutes (`H/5 * * * *`) to check for changes in the `main` branch and triggers the pipeline when new commits are detected.

#### Required Credentials:
- **DockerHub credentials**: Stored as Jenkins secrets (`dockerhub-credentials`).
- **GitHub SSH Key**: Stored as Jenkins secrets (`github-ssh-key`) to allow Jenkins to access the GitHub repository for cloning, committing, and pushing changes.

---

## Usage Instructions
1. Ensure that the Kubernetes environment is set up, and the Kubernetes manifests are correctly configured in the `kubernetes-configs` folder.
2. Update the Jenkins configuration with the correct credentials for DockerHub and GitHub as described above.
3. The Jenkins pipeline will handle Docker image builds, pushes, and Kubernetes manifest updates automatically upon detecting changes in the repository.

---
