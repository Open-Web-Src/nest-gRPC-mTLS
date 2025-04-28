pipeline {
  agent any

  stages {
    stage('Pre-Build') {
      steps {
        checkout scm
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'echo Building...'
      }
    }

    stage('Test') {
      steps {
        sh 'echo Testing'
      }
    }

    stage('Sonar Analysis') {
      steps {
        withSonarQubeEnv('LocalSonar') {
          sh 'sonar-scanner'
        }
      }
    }

    stage('Deploy') {
      steps {
        sh 'echo Deploying to production server...'
      }
    }
  }
}
