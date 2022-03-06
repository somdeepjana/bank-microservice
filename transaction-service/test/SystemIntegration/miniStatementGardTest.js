require("dotenv").config();
process.env.NODE_ENV = "test";

const chai= require("chai");
const chaiHttp= require("chai-http");
const app= require("../../src/app");
const axios= require("axios").default;

const sequelize= require("../../src/sequelize");

const {
    getKeycloakAccessToken1Async,
    getKeycloakAccessToken2Async
}= require("./helpers/getKeyclokeAccessTokenAsync");

chai.use(chaiHttp);
const should= chai.should();
const expect= chai.expect;

describe("Ministatement Route Gards", ()=>{

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

    describe("GET /transaction/statement/:accountId with no access token", ()=>{
        it("it should return 403 access denied", (done)=>{
            chai.request(app)
            .get("/transaction/statement/12345678")
            .end((err, res)=>{
                res.should.have.status(403);
                done();
            });
        });
    });

    describe("GET /transaction/statement/:accountId invalid account id", () => {
		it("it should return 404 NotFound with errorcode and message", (done) => {
			chai.request(app)
				.get("/transaction/statement/12345678")
                .set({"Authorization":`Bearer ${user1AccessToken}`})
				.end((err, res) => {
                    // console.log(res);
					res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("errorCode").eq(1);
                    res.body.should.have.property("message");
					done();
				});
		});
	});

});