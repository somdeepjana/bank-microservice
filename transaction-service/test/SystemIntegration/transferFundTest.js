require("dotenv").config();
process.env.NODE_ENV = "test";

const chai= require("chai");
const chaiHttp= require("chai-http");
const app= require("../../src/app");
const axios= require("axios").default;

const sequelize= require("../../src/sequelize");
const AccountModel= sequelize.models.account;
const TransactionModel= sequelize.models.transaction;

const {s2sKey}= require("./config/authConfigs");

const {accountTestData}= require("./testData/accountTestData");
const {transactionTestData}= require("./testData/transactionTestData");

const {statementUser1ExpectedData}= require("./testData/statementUser1ExpectedData");

const {
    getKeycloakAccessToken1Async,
    getKeycloakAccessToken2Async
}= require("./helpers/getKeyclokeAccessTokenAsync");

chai.use(chaiHttp);
const should= chai.should();
const expect= chai.expect;

describe("Ministatement Route Data", ()=>{

    // Common variable needed throughput the test
    let user1AccessToken;
    let user2AccessToken;

    /**
     * setting up the app service and and keycloak accesstoken before 
     * running all the services
     */
    before(async ()=>{
        try{

            await sequelize.sync({force: true});

            user1AccessToken= await getKeycloakAccessToken1Async();
            user2AccessToken= await getKeycloakAccessToken2Async();
            // console.log("App is started");
        }catch (err){
            console.error(err);

            if(axios.isAxiosError(err)){
                console.error("fail to get the access token");
            }else{
                console.error("db Sync failed");
            }
            process.exit(1);
        }
    });

    /**
     * droping all the data generated in privious testing
     */
    beforeEach(async ()=>{
        try{
            // delete previous data if any
            await AccountModel.destroy({where:{}});
            await TransactionModel.destroy({where:{}});

            // adding new data
            await AccountModel.bulkCreate(accountTestData);
            await TransactionModel.bulkCreate(transactionTestData);
        }
        catch(err){
            console.error(err);
            console.error("Cannot able to drop or inser data thres some problem with the connection");
            process.exit(1);
        }
    });

    describe("GET /transaction/statement/:accountId proper account id", () => {
		it("it should return 200 ok with proper data", (done) => {
            const expectedResponse= statementUser1ExpectedData.account1;

			chai.request(app)
				.get("/transaction/statement/00001")
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {
                    // console.log(res);
					res.should.have.status(200);
                    res.body.should.be.a("object");

                    res.body.should.have.property("account_id").eq(expectedResponse.account_id);
                    res.body.should.have.property("balance_amount").eq(expectedResponse.balance_amount);
                    res.body.should.have.property("limit_amount").eq(expectedResponse.limit_amount);
                    res.body.should.have.property("lien_amount").eq(expectedResponse.lien_amount);


                    res.body.should.have.property("transactions");
                    res.body.transactions.should.have.length(expectedResponse.transactions.length);

					done();
				});
		});
	});

    /**
     * cleaning test data after all the test
     */
    after(async()=>{
        try {
            await AccountModel.destroy({where:{}});
            await TransactionModel.destroy({where:{}});
        } catch (error) {
            console.error(err);
            console.error("Cannot able to drop the data after all the test thre's some problem with the connection");
            process.exit(1);
        }
    });

});