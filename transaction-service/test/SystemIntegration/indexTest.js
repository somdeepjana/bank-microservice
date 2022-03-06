require("dotenv").config();
process.env.NODE_ENV = "test";

const chai= require("chai");
const chaiHttp= require("chai-http");
const app= require("../../src/app");

chai.use(chaiHttp);
const should= chai.should();

describe("App start", ()=>{

    describe("/GET Index page", () => {
		it("it should return 200 OK", (done) => {
			chai.request(app)
				.get("/")
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});

    describe("/GET Invalid route", ()=>{
        it("it should return 404 Not found", (done)=>{
            chai.request(app)
            .get("/certainly-not-a-valid-route")
            .end((err, res)=>{
                res.should.have.status(404);
                done();
            });
        });
    });

});