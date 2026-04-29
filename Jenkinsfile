stages {

    stage('Check Docker') {
        steps {
            echo 'Checking Docker installation...'
            sh 'docker --version'
            sh 'docker-compose --version'
        }
    }

    stage('Clean Old Containers') {
        steps {
            echo 'Cleaning existing containers and networks...'
            sh 'docker-compose down --remove-orphans || true'
            sh 'docker system prune -f || true'
        }
    }

    stage('Build Images') {
        steps {
            echo 'Building Docker images...'
            sh 'docker-compose build'
        }
    }

    stage('Run Containers') {
        steps {
            echo 'Starting containers...'
            sh 'docker-compose up -d'
        }
    }

    stage('Wait for Services') {
        steps {
            echo 'Waiting for services to initialize...'
            sleep 25
        }
    }

    stage('Verify Deployment') {
        steps {
            echo 'Verifying backend health...'
            script {
                def retries = 3
                def success = false

                for (int i = 1; i <= retries; i++) {
                    try {
                        sh 'curl -f http://localhost:5000/api/health'
                        echo "✅ Backend is healthy"
                        success = true
                        break
                    } catch (Exception e) {
                        echo "⚠️ Attempt ${i} failed. Retrying in 10 seconds..."
                        sleep 10
                    }
                }

                if (!success) {
                    error "❌ Backend health check failed after multiple attempts"
                }
            }
        }
    }

    stage('Show Running Containers') {
        steps {
            echo 'Listing running containers...'
            sh 'docker ps'
        }
    }
}

post {
    success {
        echo "🎉 Deployment Successful!"
        echo "Frontend → http://localhost:3000"
        echo "Backend → http://localhost:5000/api/health"
    }
    failure {
        echo "❌ Pipeline Failed. Check logs above."
        sh 'docker-compose logs || true'
    }
    always {
        echo "📌 Pipeline execution completed."
    }
}
```

}
