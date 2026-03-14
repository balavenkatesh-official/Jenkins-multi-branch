pipeline {
    agent any

    environment {
        IMAGE_NAME = "balavenkateshhub/my-node-app"
        IMAGE_TAG = "production"
        CONTAINER_NAME = "my-node-app"
        APP_PORT = "3000"
    }

    stages {
        // stage('Checkout') {
        //     steps {
        //         checkout scm
        //     }
        // }

        stage('Docker Build') {
            steps {
                dir('myapp') {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} myapp/Dockerfile"
                }
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker logout"
                }
            }
        }

        stage('Deploy') {
            steps {
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"
                sh "docker run -d --name ${CONTAINER_NAME} -p ${APP_PORT}:3000 --restart unless-stopped ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }
    }

    post {
        success {
            echo "Deployment successful! App running on port ${APP_PORT}"
        }
        failure {
            echo "Build failed. Check logs above."
        }
        always {
            sh "docker logout || true"
        }
    }
}
