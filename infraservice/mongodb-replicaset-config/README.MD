# MongoDb Replicaset configuaration
this readme contains the information about the MongoDb configuratio needed for running the accounts microservice

## Replicaset
acoounts microservice needs MongoDb runnig with replica set enabled because Transactions in MongoDb only supported with replica set

## Local system config procedure
1. Go to mongob root directory because you need to run `mongod` executable. If it's in your system path then no need.

2. Copy the `mongodRs.cfg` file present in this folder into a proper location becase you have to retain the config file as long as mongo is running.

3. Enter below command

    > mongod --config "<absolute_path_to_cfg>" --serviceName <unique_servicename> --serviceDisplayName <service_display_name> --install

    This will install a service named <unique_servicename> in windows and the display name will be <service_display_name>.
    Below a complete example command is given

    > mongod --config "C:\Program Files\MongoDB\Server\5.0\bin\mongodRs.cfg" --serviceName MongoDBRS0 --serviceDisplayName MongoDBRS0 --install

4. Now open windows `services` and search for `service_display_name`(eg: `MongoDBRS0`) then start the service or restart the system.

5. Go to mongo root directory again, this time `mongo` shell application needs to be run. write the below command.

    > mongo --port 27018

    In the `.cfg` file the running service port is set as `27018` thats why its needs to be provided.

6. Then inside the mongo shell run below command

    > rs.initiate()

    This will initialized the replica set.

7. Now in the `account-service` .env file give mongodb connection string like below.

    > mongodb://localhost:27018/<db-name>?replicaSet=rs1

    Here `rs1` is the replica set name given in the `.cfg` file. A complete example is given below.

    > mongodb://localhost:27018/account-service-mongodb?replicaSet=rs1