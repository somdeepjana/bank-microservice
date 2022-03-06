# Accounts Microservice

This service is responsible for managing the accounts related service.

## System Requierment

This can be run using docker as well as standalon. For docker only docker desktop needs to be installed and for standalon nodejs needs to be installed. This system also depends on mongodb database with replicaset for using the transaction. Setup instruction for mongodb is given inside infraservice folder.


## Running Instructions

1. Create a copy of `.env.example` in this folder and rename it to `.env`. This is used to supply the enviormental variable to the application and those can also be provided directly. `.env` file is only for convenience and is't used in docker deploy.

2. Change the configuration of `.env` according to your system setup.

3. Open a terminal window in this folder and run `npm start` this will start a deployable build. if you wnat to run the development setup, run `npm run dev`. development setup uses `nodemon` to rerun the server whenever a file is changed. For running in debugging mode command is `npm run debug`.

## Running Test

Open a terminal with in this folder then type the command `npm run tunit` for runing the unit test only other commands are given below.

1. Unit Test with coverage: `npm run coverunit`
2. System Inegration Test with coverage: `npm run coversi`

For running system integration test database and keycloak needs to be running.

A postman collection is also provided here for manual testing.