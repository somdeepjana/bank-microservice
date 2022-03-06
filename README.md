# bank-app
> Project to simulate the basic banking scenario

<hr>

# Running instructions

The system can be run in docker container as well as standalone.

## Backend Docker compose run

For running the backend system with keycloak server and microservices just rename the `.env.example` to `.env` then open a teminal in the main folder and type `docker-compose up -d`. It will start 8 containers with 1 keycloak instance, 1 postgres Db for keycloak instance, 1 mongodb instance with replica set for accounts microservice, 1 mysql instance with transacion microservice and 2 instances of accounts and transaction microservice.
### Docker instant access

From local system the default address is `http://localhost:80`. Account Microservice is running at `http://localhost/am/`, transaction microservice is running at `http://localhost/tm/` and keycloak is running at `http://localhost/auth`.

A test client credential is provided in the `.env` file and also mentioned below
```
client_id:      test-client
client_secret:  2141b729-ec75-4e62-87c6-0098728d95fb
```
This credentials can be used to generate access token using postman to access the microservices. Below a test username is given to generate the access token
```
username:   user1
password:   user1
```
This credentials are just for convenience and can be changed from key cloak at `http://localhost/auth`.

## Local system run

For local system all the services needs to be configured manually. Steps are provided below

1. For running the accounts microservice mongodb database with replica set is needed. Inside `<base_directory>/infraservice/mongodb-replicaset-config` a `readme.md` file is given to set it up.

2. For running keucloak go to `https://www.keycloak.org/` and download the binaries. Go into the `<keycloak_base>/bin` folder and within the terminal run `./standalone.bat` or `./standalone.sh` depending on the os. this will run the keycloak at `http://localhost:8080`.Go to the web portal and follow the on screen instruction. then create a realm `eg: bank-app` create atlease three clients for three services named `account-microservice`, `transaction-microservice` and `web-app`. make accounts and transaction microservice as bearer-only client and from the `credentials` tab copy their `client_secret`, this is needed for setting up the rest services.

3. Transaction microservice depends on `SQL` database and it supports `MySQL`, `MariaDB`, `Postgrs`, `Mssql`, `SQLlite3`. By default we provided support for `MySql` and `SQLlite3` if other db is needed then appropriate packages needs to be installed. For basic testing Transaction service by default uses `SQLlite3` which dosen't ned any configuration. for configuaring other database see the transaction microservice configuration section.

4. for microservice configuration a `Readme.md` is provided inside their folders.

# Usage
By default each microservice will seed the database whenever they are started. This functionality can be turned off by setting the enviormental variable from `DEV=*` to `DEV=`. All the services contains a postman colletion `.json` file than can be loaded using postman. their at the variables tab base url needs to be set but some basic configurations are also set like for account service the base url is set as `http://localhost:3000`. For keycloak base postman collection is also provided at `<base_directory>/infraservice/keycloak-service`. The services can be called from postman using the collection as well as from the frontend.

## Default setup consideration
The microservices data seeded considering that the keycloak service contains two user with username `user1` and `user2` so in local system setup case these needs to be setup manually but for docker container these are seeded automatically. 