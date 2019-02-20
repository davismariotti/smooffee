pipeline {
    agent any
    options {
        ansiColor('xterm')
    }
    environment {
        JENKINS_TEST = 'true'
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
        stage ('Test Titan') {
            steps {
                echo 'Building..'
                dir ('titan') {
                  sh "sbt test"
                }
            }
        }
    }
}
