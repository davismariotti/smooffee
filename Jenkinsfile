pipeline {
    agent any
    options {
        ansiColor('xterm')
    }
    environment {
        ARABICA_USE_LOGIN = 'true'
        ARABICA_POSTGRES_LOGIN = credentials('jenkins-postgres')
    }
    stages {
        stage ('Initialize') {
            steps {
                sh '''
                    echo "PATH = ${PATH}"
                '''
            }
        }
        stage ('Test Arabica') {
            steps {
                echo 'Building Arabica..'
                dir ('arabica') {
                  sh "sbt test"
                }
            }
        }
    }
}
