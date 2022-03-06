require("dotenv").config();
process.env.NODE_ENV = "test";

const sinon= require("sinon");

const {CurrencyRateModel}= require("../../src/services/mongoose").models;
const CurrencyRateController= require("../../src/routes/CurrencyRate/CurrencyRateController");

describe("Currency Rate Controller", ()=>{

    let req;

    let res={};
    let resStatusSpy;
    let resJsonStub;

    let spyObj;

    before(()=>{
        req= {
            query:{
                from: "testFromCurr",
                to: "testToCurr",
                amount: "1234",
            }
        }
    });

    beforeEach(()=>{
        spyObj= sinon.spy();
        resJsonStub= sinon.stub();
        resStatusSpy= sinon.stub().returns({
            json: resJsonStub
        });

        res= {
            status: resStatusSpy
        }
    });

    afterEach(()=>{
        sinon.restore();
        // resStatusSpy.restore();

    });

    describe("Get all rate detail with db error", ()=>{
        it("it should return 500 Internal server error", async()=>{
            const currencyRateStub= sinon.stub(CurrencyRateModel, "find").throws();
            await CurrencyRateController.allRates(req, res);

            sinon.assert.calledOnce(currencyRateStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 500);
            // accountStub.restore();
        });
    });

    describe("Get all rate detail with empty array", ()=>{
        it("it should return 200 ok with empty array", async()=>{
            const currencyRateStub= sinon.stub(CurrencyRateModel, "find").returns([]);
            await CurrencyRateController.allRates(req, res);

            sinon.assert.calledOnce(currencyRateStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 200);

            sinon.assert.calledWith(resJsonStub, []);
            // accountStub.restore();
        });
    });

    describe("Get all rate detail with filled array", ()=>{
        it("it should return 200 ok", async()=>{
            const currencyRateStub= sinon.stub(CurrencyRateModel, "find").returns([spyObj]);
            await CurrencyRateController.allRates(req, res);

            sinon.assert.calledOnce(currencyRateStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 200);

            sinon.assert.calledOnce(resJsonStub);
            // accountStub.restore();
        });
    });


    describe("Get conversion rate with null data return", ()=>{
        it("it should return 400 bad request currency not found", async()=>{
            const currencyRateStub= sinon.stub(CurrencyRateModel, "findOne").returns(null);
            await CurrencyRateController.convertRate(req, res);

            sinon.assert.calledTwice(currencyRateStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 400);
            sinon.assert.calledOnce(resJsonStub);
        });
    });

    describe("Get conversion rate with db error", ()=>{
        it("it should return 500 internal server error", async()=>{
            const currencyRateStub= sinon.stub(CurrencyRateModel, "findOne").throws();
            await CurrencyRateController.convertRate(req, res);

            sinon.assert.called(currencyRateStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 500);
            sinon.assert.calledOnce(resJsonStub);
        });
    });

    describe("Get conversion rate with proper data return", ()=>{
        it("it should return 200 ok", async()=>{
            const currencyRateStub= sinon.stub(CurrencyRateModel, "findOne").returns(Promise.resolve(10));
            await CurrencyRateController.convertRate(req, res);

            sinon.assert.calledTwice(currencyRateStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 200);
            sinon.assert.calledOnce(resJsonStub);
        });
    });
});