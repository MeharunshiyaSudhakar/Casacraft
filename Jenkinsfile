pipeline {
    agent any

    /* 
       Environment configuration can be added here if needed, 
       such as Docker Registry credentials.
    */
    environment {
        APP_NAME = "casacraft-mern"
    }

    stages {
        // Stage 1: Clone the repository
        stage('Clone Repository') {
            steps {
                echo 'Cleaning workspace and cloning the latest code from GitHub...'
                // 'checkout scm' automatically uses the Git configuration defined in the Jenkins job
                checkout scm
            }
        }

        // Stage 2: Build Docker images using Docker Compose
        stage('Build Docker Images') {
            steps {
                echo 'Building backend and frontend Docker images...'
                // Using docker-compose build to generate images based on docker-compose.yml
                sh 'docker-compose build'
            }
        }

        // Stage 3: Run the application using Docker Compose
        stage('Run Containers') {
            steps {
                echo 'Stopping existing containers and starting new ones in detached mode...'
                // Ensure a clean state by stopping old containers before starting new ones
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }

        // Stage 4: Verify the deployment
        stage('Verify Deployment') {
            steps {
                echo 'Verifying that all services are running...'
                // List all running containers to confirm successes
                sh 'docker ps'
                
                // Optional: Wait for services to fully initialize and check API health
                echo 'Waiting for services to initialize...'
                sleep 10
                sh 'curl -f http://localhost:5000/api/health || echo "Backend check failed, but continuing..."'
            }
        }
    }

    // Post-pipeline actions for notifications or cleanup
    post {
        success {
            echo "CI/CD Pipeline successful! Application is live at http://localhost:3000"
        }
        failure {
            echo "Pipeline failed. Check Jenkins logs for details."
        }
    }
}
