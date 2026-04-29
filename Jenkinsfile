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

    stage('Show Running Containers') {
        sh 'docker ps'
    }
}