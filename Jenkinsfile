pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                sh '''
                    echo "registry=http://10.0.16.12:8081/repository/npm-registry/" > .npmrc
                    echo "_auth=YWRtaW46a2xqZmFzZnU4OTcyMzQ5OGllYWZvbmQz" >> .npmrc
                    npm install --no-optional --loglevel verbose
                '''
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Unit test') {
            steps {
                sh 'npm run test:client'
            }
        }
        stage('Container') {
            when {
                branch 'master'
            }
            steps {
                sh '''
                    docker build --no-cache --force-rm --build-arg DOCKERREPO=localhost:8082 --build-arg USENEXUS=true -t coeus-portal .
                    docker tag coeus-portal localhost:8083/coeus-portal
                    docker push localhost:8083/coeus-portal
                    docker rmi coeus-portal
                    docker rmi $(docker images | grep "coeus-portal" | awk '{print $3}')
                '''
            }
        }        
        stage('Integration Test') {
            when {
                branch 'master'
            }
            steps {
                build job: 'Atos-GitHub-DSS-Coeus/DSS-Coeus-Automated-Testing/master', wait: false
            }
        }          
        stage('Clean Up') {
            steps {
                deleteDir()
            }
        }        
    }
}
