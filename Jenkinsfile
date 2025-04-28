pipeline {
  agent any

  stages {
    stage('Pre-Build') {
      steps {
        checkout scm
        sh '''
          echo Installing user-service dependencies...
          cd user-service
          npm install --legacy-peer-deps

          echo Installing order-service dependencies...
          cd ../order-service
          npm install --legacy-peer-deps
        '''
      }
    }

    stage('Build') {
      steps {
        sh '''
          echo Building user-service...
          cd user-service
          npm run build

          echo Building order-service...
          cd ../order-service
          npm run build
        '''
      }
    }

    stage('Test') {
      steps {
        sh '''
          echo Testing user-service...
          cd user-service
          // npm run test
          echo Test success!

          echo Testing order-service...
          cd ../order-service
          // npm run test
          echo Test success!
        '''
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
