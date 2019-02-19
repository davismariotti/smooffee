pipeline {
    agent any
    options {
        ansiColor('xterm')
    }
    tools {
        jdk 'jdk8'
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
