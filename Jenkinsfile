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
          cd user-service && npm run lint || true
          cd ../order-service && npm run lint || true
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
          cd user-service && npx eslint src/ --format json -o eslint-report.json --max-warnings 0 || true
          cd ../order-service && npx eslint src/ --format json -o eslint-report.json --max-warnings 0 || true
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
