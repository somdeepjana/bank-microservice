require("dotenv").config();
process.env.NODE_ENV = "test";

const chai= require("chai");
const chaiHttp= require("chai-http");
const appInitAsync= require("../../src/app");
const axios= require("axios").default;

const {AccountModel}= require("../../src/services/mongoose").models;

const {s2sKey}= require("./config/authConfigs");
const {transferUser1TestData}= require("./testData/transferUser1TestData");
const {transferUser1ExpectedData}= require("./testData/transferUser1ExpectedData");

const {accountModelUser1TestData}= require("./testData/accountModelUser1TestData");
const {accountModelUser2TestData}= require("./testData/accountModelUser2TestData");

const {
    getKeycloakAccessToken1Async,
    getKeycloakAccessToken2Async
}= require("./helpers/getKeyclokeAccessTokenAsync");

chai.use(chaiHttp);
const should= chai.should();
const expect= chai.expect;

describe("Notify Transaction Route Transfer", ()=>{

    // Common variable needed throughput the test
    let app;
    let user1AccessToken;
    let user2AccessToken;

    /**
     * setting up the app service and and keycloak accesstoken before 
     * running all the services
     */
    before(async ()=>{
        try{
            app= await appInitAsync();

            user1AccessToken= await getKeycloakAccessToken1Async();
            user2AccessToken= await getKeycloakAccessToken2Async();
            // console.log("App is started");
        }catch (err){
            console.error(err);

            if(axios.isAxiosError(err)){
                console.error("fail to get the access token");
            }else{
                console.error("fail to initialize app maybe db connect failed");
            }
            process.exit(1);
        }
    });

    /**
     * droping all the data generated in privious testing
     */
    beforeEach(async ()=>{
        try{
            await AccountModel.deleteMany({});
            await AccountModel.insertMany(accountModelUser1TestData);
            await AccountModel.insertMany(accountModelUser2TestData);
        }
        catch(err){
            console.error(err);
            console.error("Cannot able to drop the data thres some problem with the connection");
            process.exit(1);
        }
    });

    describe("POST /notify/transaction with self transfer enough balance", () => {
		it("it should return 200 OK proper response ", (done) => {
            const transferRequestData= transferUser1TestData.self.succed(s2sKey);
            const transferExpectedResponse= transferUser1ExpectedData
                                            .self.succed(transferRequestData.transc_id);

			chai.request(app)
				.post("/notify/transaction")
                .send(transferRequestData)
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {

                    // testing status and type
					res.should.have.status(200);
                    res.body.should.be.a("object");

                    // testing direct properties
                    res.body.should.have.property("transc_id").eql(transferExpectedResponse.transc_id);
                    res.body.should.have.property("amount").eql(transferExpectedResponse.amount);
                    res.body.should.have.property("status").eql(transferExpectedResponse.status);

                    // from account verify
                    res.body.should.have.property("from_account");
                    res.body.from_account.should.have.property("account_id").eql(transferExpectedResponse.from_account.account_id);
                    res.body.from_account.should.have.property("balance_amount").eql(transferExpectedResponse.from_account.balance_amount);
                    res.body.from_account.should.have.property("limit_amount").eql(transferExpectedResponse.from_account.limit_amount);
                    res.body.from_account.should.have.property("lien_amount").eql(transferExpectedResponse.from_account.lien_amount);
                    res.body.from_account.should.have.property("effective_balance").eql(transferExpectedResponse.from_account.effective_balance);

                    // toaccount verify
                    res.body.should.have.property("to_account");
                    res.body.to_account.should.have.property("account_id").eql(transferExpectedResponse.to_account.account_id);
                    res.body.to_account.should.have.property("balance_amount").eql(transferExpectedResponse.to_account.balance_amount);
                    res.body.to_account.should.have.property("limit_amount").eql(transferExpectedResponse.to_account.limit_amount);
                    res.body.to_account.should.have.property("lien_amount").eql(transferExpectedResponse.to_account.lien_amount);
                    res.body.to_account.should.have.property("effective_balance").eql(transferExpectedResponse.to_account.effective_balance);

					done();
				});
		});
	});

    describe("POST /notify/transaction with to others enough balance", () => {
		it("it should return 200 OK proper response ", (done) => {
            const transferRequestData= transferUser1TestData.other.succed(s2sKey);
            const transferExpectedResponse= transferUser1ExpectedData
                                            .other.succed(transferRequestData.transc_id);

			chai.request(app)
				.post("/notify/transaction")
                .send(transferRequestData)
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {
                    // console.log(res);
					res.should.have.status(200);
                    res.body.should.be.a("object");
                    
                    // testing direct properties
                    res.body.should.have.property("transc_id").eql(transferExpectedResponse.transc_id);
                    res.body.should.have.property("amount").eql(transferExpectedResponse.amount);
                    res.body.should.have.property("status").eql(transferExpectedResponse.status);

                    // from account verify
                    res.body.should.have.property("from_account");
                    res.body.from_account.should.have.property("account_id").eql(transferExpectedResponse.from_account.account_id);
                    res.body.from_account.should.have.property("balance_amount").eql(transferExpectedResponse.from_account.balance_amount);
                    res.body.from_account.should.have.property("limit_amount").eql(transferExpectedResponse.from_account.limit_amount);
                    res.body.from_account.should.have.property("lien_amount").eql(transferExpectedResponse.from_account.lien_amount);
                    res.body.from_account.should.have.property("effective_balance").eql(transferExpectedResponse.from_account.effective_balance);

                    // toaccount verify
                    res.body.should.have.property("to_account");
                    res.body.to_account.should.have.property("account_id").eql(transferExpectedResponse.to_account.account_id);
                    res.body.to_account.should.have.property("balance_amount").eql(transferExpectedResponse.to_account.balance_amount);
                    res.body.to_account.should.have.property("limit_amount").eql(transferExpectedResponse.to_account.limit_amount);
                    res.body.to_account.should.have.property("lien_amount").eql(transferExpectedResponse.to_account.lien_amount);
                    res.body.to_account.should.have.property("effective_balance").eql(transferExpectedResponse.to_account.effective_balance);
					done();
				});
		});
	});

    describe("POST /notify/transaction with self transfer low balance", () => {
		it("it should return 400 BadRequest with errorcode and message ", (done) => {
			chai.request(app)
				.post("/notify/transaction")
                .send(transferUser1TestData.self.lowbalance(s2sKey))
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {
                    // console.log(res);
					res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property("errorCode").eql(5);
                    res.body.should.have.property("message");
					done();
				});
		});
	});

    describe("POST /notify/transaction with transfer to others low balance", () => {
		it("it should return 400 BadRequest with errorcode and message ", (done) => {
			chai.request(app)
				.post("/notify/transaction")
                .send(transferUser1TestData.other.lowbalance(s2sKey))
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {
                    // console.log(res);
					res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property("errorCode").eql(5);
                    res.body.should.have.property("message");
					done();
				});
		});
	});

    describe("POST /notify/transaction with others from account id", () => {
		it("it should return 400 BadRequest with errorcode and message ", (done) => {
            const transferRequestData= transferUser1TestData.self.succed(s2sKey);
            transferRequestData.from_account= accountModelUser2TestData[0].account_id;

			chai.request(app)
				.post("/notify/transaction")
                .send(transferRequestData)
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {
                    // console.log(res);
					res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property("errorCode").eql(4);
                    res.body.should.have.property("message");
					done();
				});
		});
	});

    describe("POST /notify/transaction with to account id invalid", () => {
		it("it should return 400 BadRequest with errorcode and message ", (done) => {
            const transferRequestData= transferUser1TestData.self.succed(s2sKey);
            transferRequestData.to_account= "certainly invalid account id";

			chai.request(app)
				.post("/notify/transaction")
                .send(transferRequestData)
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {
                    // console.log(res);
					res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property("errorCode").eql(6);
                    res.body.should.have.property("message");
					done();
				});
		});
	});
   
    /**
     * cleaning test data after all the test
     */
    after((done)=>{
        AccountModel.deleteMany({}, (err)=>{
            if(err){
                console.error(err);
                console.error("Cannot able to drop the data after all the test thre's some problem with the connection");
                process.exit(1);
            }else{
                done();
            }
        });
    });

});