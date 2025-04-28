pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh '''
          cd user-service && npm install
          cd ../order-service && npm install
        '''
      }
    }

    stage('Lint') {
      steps {
        sh '''
          cd user-service && npm run lint
          cd ../order-service && npm run lint
        '''
      }
    }

    stage('Test') {
      steps {
        sh '''
          cd user-service && npm run test -- --coverage --passWithNoTests
          cd ../order-service && npm run test -- --coverage --passWithNoTests
        '''
      }
    }

    stage('Generate ESLint Reports') {
      steps {
        sh '''
          cd user-service && npx eslint src/ --format json -o eslint-report.json
          cd ../order-service && npx eslint src/ --format json -o eslint-report.json
        '''
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('LocalSonar') {
          sh '''
            sonar-scanner
          '''
        }
      }
    }
  }
}
