```groovy
pipeline {
    agent any

    stages {

        stage('Check Docker') {
            steps {
                sh 'docker --version'
                sh 'docker-compose --version'
            }
        }

        stage('Clean Old Containers') {
            steps {
                sh 'docker-compose down --remove-orphans || true'
                sh 'docker system prune -f || true'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Wait for Services') {
            steps {
                sleep 20
            }
        }

        stage('Health Check') {
            steps {
                script {
                    try {
                        sh 'curl -f http://localhost:5000/api/health'
                        echo "Backend OK"
                    } catch (Exception e) {
                        sleep 10
                        sh 'curl -f http://localhost:5000/api/health'
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Deployment Successful"
        }
        failure {
            echo "Pipeline Failed"
        }
    }
}