require("dotenv").config();
process.env.NODE_ENV = "test";

const chai= require("chai");
const chaiHttp= require("chai-http");
const appInitAsync= require("../../src/app");

chai.use(chaiHttp);
const should= chai.should();

describe("App start", ()=>{
    let app;

    before((done)=>{
        appInitAsync().then((_app)=>{
            // console.log("Intializing app start");
            app= _app;
            done();
            // console.log("App is started");
        }).catch((err)=>{
            console.error(err);
            console.error("fail to initialize app maybe db connect failed");
            process.exit();
        })
    });

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