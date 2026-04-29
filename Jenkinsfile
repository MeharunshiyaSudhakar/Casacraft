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
        sleep 25
    }

    stage('Health Check') {
        def url = "http://localhost:5000/api/health"  // change if needed

        try {
            sh "curl -f ${url}"
            echo "✅ Backend OK"
        } catch (e) {
            echo "Retrying..."
            sleep 10
            sh "curl -f ${url}"
        }
    }

    stage('Show Containers') {
        sh 'docker ps'
    }
}