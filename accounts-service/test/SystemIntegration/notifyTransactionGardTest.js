require("dotenv").config();
process.env.NODE_ENV = "test";

const chai= require("chai");
const chaiHttp= require("chai-http");
const appInitAsync= require("../../src/app");
const axios= require("axios").default;

const {AccountModel}= require("../../src/services/mongoose").models;

const {s2sKey}= require("./config/authConfigs");
const {transferUser1TestData}= require("./testData/transferUser1TestData");
const {accountModelUser1TestData}= require("./testData/accountModelUser1TestData");
const {allAccountsUser1ExpectedData}= require("./testData/allAccountsUser1ExpectedData");

const {
    getKeycloakAccessToken1Async,
    getKeycloakAccessToken2Async
}= require("./helpers/getKeyclokeAccessTokenAsync");

chai.use(chaiHttp);
const should= chai.should();
const expect= chai.expect;

describe("Notify Transaction Route Gard", ()=>{

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
        }
        catch(err){
            console.error(err);
            console.error("Cannot able to drop the data thres some problem with the connection");
            process.exit(1);
        }
    });

    describe("POST /notify/transaction with no body data", () => {
		it("it should return 400 BadRequest ", (done) => {
			chai.request(app)
				.post("/notify/transaction")
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {
                    // console.log(res);
					res.should.have.status(400);
					done();
				});
		});
	});

    describe("POST /notify/transaction with no account", () => {
		it("it should return 400 Badrequest with errorcode ", (done) => {
			chai.request(app)
				.post("/notify/transaction")
                .send(transferUser1TestData.self.succed(s2sKey))
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {
                    // console.log(res);
					res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property("errorCode").eql(4);
					done();
				});
		});
	});

    describe("POST /notify/transaction with wrong s2s key", () => {
		it("it should return 400 Badrequest with error details ", (done) => {
			chai.request(app)
				.post("/notify/transaction")
                .send(transferUser1TestData.self.succed("certainly wrong s2s key"))
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {
                    // console.log(res);
					res.should.have.status(400);
                    // res.body.should.be.a("object");
                    // res.body.should.have.property("errorCode").eql(3);
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