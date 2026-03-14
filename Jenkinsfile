pipeline {
    agent any

    environment {
        IMAGE_NAME    = 'balavenkateshhub/my-node-app'
        IMAGE_TAG     = 'production'
        CONTAINER_NAME = 'my-node-app'
        APP_PORT      = '3000'
    }

    stages {

         stage('Checkout') {
             steps {
                 echo 'Cloning repository...'
                 checkout scm
             }
          }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                {
                    sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
                }
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing image to Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying container...'
                sh '''
                    # Stop and remove existing container if running
                    docker stop ${CONTAINER_NAME} || true
                    docker rm   ${CONTAINER_NAME} || true

                    # Run new container
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${APP_PORT}:3000 \
                        --restart unless-stopped \
                        ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful! App running on port ${APP_PORT}"
        }
        failure {
            echo '❌ Build failed. Check logs above.'
        }
        always {
            echo 'Pipeline finished.'
            sh 'docker logout || true'
        }
    }
}
