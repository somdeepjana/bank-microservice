require("dotenv").config();
process.env.NODE_ENV = "test";

const chai= require("chai");
const chaiHttp= require("chai-http");
const appInitAsync= require("../../src/app");

const {AccountModel}= require("../../src/services/mongoose").models;

const {accountModelUser1TestData}= require("./testData/accountModelUser1TestData");
const {allAccountsUser1ExpectedData}= require("./testData/allAccountsUser1ExpectedData");

const {getKeycloakAccessToken1Async}= require("./helpers/getKeyclokeAccessTokenAsync");

chai.use(chaiHttp);
const should= chai.should();
const expect= chai.expect;

describe("Accounts Routes", ()=>{

    // Common variable needed throughput the test
    let app;
    let user1AccessToken;

    /**
     * setting up the app service and and keycloak accesstoken before 
     * running all the services
     */
    before((done)=>{
        appInitAsync().then((_app)=>{
            // console.log("Intializing app start");
            app= _app;

            getKeycloakAccessToken1Async()
            .then((_accessToken)=>{
                // console.log(response);
                user1AccessToken= _accessToken;
                done();
            })
            .catch((err)=>{
                console.error(err);
                console.error("fail to get the access token");
                process.exit(1);
            });
            // console.log("App is started");
        }).catch((err)=>{
            console.error(err);
            console.error("fail to initialize app maybe db connect failed");
            process.exit(1);
        })
    });

    /**
     * droping all the data generated in privious testing
     */
    beforeEach((done)=>{
        AccountModel.deleteMany({}, (err)=>{
            if(err){
                console.error(err);
                console.error("Cannot able to drop the data thres some problem with the connection");
                process.exit(1);
            }else{
                done();
            }
        });
    });

    describe("GET /details/accounts with no authentication token", ()=>{
        it("it should return 403 Access Denied", (done)=>{
            chai.request(app)
            .get("/details/accounts")
            .end((err, res)=>{
                res.should.have.status(403);
                done();
            });
        });
    });

    describe("GET /details/accounts with no account present", () => {
		it("it should return 404 Notfound ", (done) => {
			chai.request(app)
				.get("/details/accounts")
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {
                    // console.log(res);
					res.should.have.status(404);
					done();
				});
		});
	});

    describe("GET /details/accounts with testUser accounts present", ()=>{
        it("it should return 200 OK with proper data in list", (done)=>{
            AccountModel.insertMany(accountModelUser1TestData)
            .then((result)=>{
                chai.request(app)
                    .get("/details/accounts")
                    .set({"Authorization":`Bearer ${user1AccessToken}`})
                    .end((err, res) => {
                        // console.log(res);
                        res.should.have.status(200);
                        res.body.should.be.a("array");
                        res.body.length.should.be.eql(accountModelUser1TestData.length);
                        
                        for(let i=0; i<allAccountsUser1ExpectedData.length; i++ ){
                            res.body[i].should.have.property("account_id").eql(allAccountsUser1ExpectedData[i].account_id);
                            res.body[i].should.have.property("balance_amount").eql(allAccountsUser1ExpectedData[i].balance_amount);
                            res.body[i].should.have.property("limit_amount").eql(allAccountsUser1ExpectedData[i].limit_amount);
                            res.body[i].should.have.property("lien_amount").eql(allAccountsUser1ExpectedData[i].lien_amount);
                            res.body[i].should.have.property("effective_balance").eql(allAccountsUser1ExpectedData[i].effective_balance);
                        }
                        done();
                    });
            })
            .catch((err)=>{
                console.error(err);
                console.error("cannot insert data into the db their maybe problem with the db connection");
                process.exit(1);
            });
        });
    });

    /**
     * cleaning test data after all the testcases
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