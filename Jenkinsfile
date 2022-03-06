pipeline {
  agent none
    
  stages {
    stage("Service testing"){
      parallel {
        stage("Accounts microservice Testing"){
          agent any
          stages {
            stage("Accounts Dependencies install"){
              steps{
                dir('accounts-service'){
                  bat 'npm ci'
                }
              }
            }
            stage("Accounts unit test"){
              steps {
                dir('accounts-service'){
                  bat 'npm run coverunit'
                }
              }
            }
          }
        }

        stage("Transactions microservice Testing"){
          agent any
          stages {
            stage("Transactions Dependencies install"){
              steps{
                dir('transaction-service'){
                  bat 'npm ci'
                }
              }
            }
            stage("Transactions unit test"){
              steps{
                dir('transaction-service'){
                  bat 'npm run coverunit'
                }
              }
            }
          }
        }

        stage("Angular frontend testing"){
          agent any
          stages {
            stage("Angular Dependencies install"){
              steps{
                dir('capstone-product'){
                  bat 'npm ci'
                }
              }
            }
            stage("Angular unit test"){
              steps{
                dir('capstone-product'){
                  bat 'npm run test-headless'
                }
              }
            }
            stage("Angular e2e test"){
              steps{
                dir('capstone-product'){
                  bat 'npm run e2e'
                }
              }
            }
          }
        }
      }
    }
  }     
}