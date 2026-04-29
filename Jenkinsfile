node {

    stage('Check Docker') {
        sh 'docker --version'
        sh 'docker-compose --version'
    }

    stage('Clean Old Containers') {
        sh 'docker-compose down --remove-orphans || true'
        sh 'docker system prune -f || true'
    }

    stage('Build Images') {
        sh 'docker-compose build'
    }

    stage('Run Containers') {
        sh 'docker-compose up -d'
    }

    stage('Wait for Services') {
        sleep 20
    }

    stage('Health Check') {
        try {
            sh 'curl -f http://localhost:5001/api/health'
            echo "Backend OK"
        } catch (e) {
            sleep 10
            sh 'curl -f http://localhost:5001/api/health'
        }
    }

    stage('Show Containers') {
        sh 'docker ps'
    }
}