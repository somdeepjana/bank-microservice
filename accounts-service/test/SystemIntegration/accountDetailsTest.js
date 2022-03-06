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

describe("Account Details Route", ()=>{

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

    describe("GET /details/accounts/:accountId with no authentication token", ()=>{
        it("it should return 403 Access Denied", (done)=>{
            chai.request(app)
            .get(`/details/accounts/${accountModelUser1TestData[0].account_id}`)
            .end((err, res)=>{
                res.should.have.status(403);
                done();
            });
        });
    });

    describe("GET /details/accounts/:accountId with no account present", () => {
		it("it should return 404 Notfound ", (done) => {
			chai.request(app)
				.get(`/details/accounts/${accountModelUser1TestData[0].account_id}`)
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {
                    // console.log(res);
					res.should.have.status(404);
					done();
				});
		});
	});

    describe("GET /details/accounts/:accountId with wrong user account", () => {
		it("it should return 404 Notfound ", (done) => {
			chai.request(app)
				.get("/details/accounts/1223445667889987665-certenly-wrong")
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {
                    // console.log(res);
					res.should.have.status(404);
                    res.body.should.have.property("errorCode").eql(1);
					done();
				});
		});
	});

    describe("GET /details/accounts/:accountId with testUser account present", ()=>{
        it("it should return 200 OK with proper data", (done)=>{
            AccountModel.insertMany(accountModelUser1TestData)
            .then((result)=>{
                const subjectOfImportance= accountModelUser1TestData[1];
                const expectedResponse= allAccountsUser1ExpectedData[1];

                chai.request(app)
                    .get(`/details/accounts/${subjectOfImportance.account_id}`)
                    .set({"Authorization":`Bearer ${user1AccessToken}`})
                    .end((err, res) => {
                        // console.log(res);
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.should.have.property("account_id").eql(expectedResponse.account_id);
                        res.body.should.have.property("balance_amount").eql(expectedResponse.balance_amount);
                        res.body.should.have.property("limit_amount").eql(expectedResponse.limit_amount);
                        res.body.should.have.property("lien_amount").eql(expectedResponse.lien_amount);
                        res.body.should.have.property("effective_balance").eql(expectedResponse.effective_balance);
                        
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