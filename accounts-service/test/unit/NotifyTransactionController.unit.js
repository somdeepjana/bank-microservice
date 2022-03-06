require("dotenv").config();
process.env.NODE_ENV = "test";

const sinon= require("sinon");

const {AccountModel}= require("../../src/services/mongoose").models;
const notifyTransactionController= require("../../src/routes/NotifyTransaction/NotifyTransactionController");

describe("Notify Transaction Controller", ()=>{

    let req;

    let res={};
    let resStatusSpy;
    let resJsonSpy;

    let spyObj;

    let accountModelFindOneStub;
    let accountModelPopulate;
    let accountModelSession;

    let startSessionStub;
    let endSessionStub;

    let startTranscStub;
    let abortTranscStub;
    let commitTranscStub;
    let dbSaveStub;

    before(()=>{
        req= {
            kauth:{
                grant:{
                    access_token:{
                        content:{
                            preferred_username: "testusername"
                        }
                    }
                }
            },
            body:{
                transc_id: "tetTransacId",
                amount: 5,
                from_account: "testFromAccount",
                to_account: "testToAccount",
                transac_currency: "USD"
            }
        }
    });

    beforeEach(()=>{
        spyObj= sinon.spy();
        resJsonSpy= sinon.stub();
        resStatusSpy= sinon.stub().returns({
            json: resJsonSpy
        });

        res= {
            status: resStatusSpy
        }

        accountModelSession= sinon.stub();
        accountModelPopulate= sinon.stub().returns({
            session: accountModelSession
        });
        accountModelFindOneStub= sinon.stub(AccountModel, "findOne").returns({
            populate: accountModelPopulate
        });

        startTranscStub=sinon.stub();
        abortTranscStub=sinon.stub();
        commitTranscStub=sinon.stub();
        dbSaveStub=sinon.stub();

        endSessionStub= sinon.stub();
        startSessionStub= sinon.stub(AccountModel, "startSession").returns({
            endSession: endSessionStub,
            startTransaction: startTranscStub,
            abortTransaction: abortTranscStub,
            commitTransaction: commitTranscStub
        });
        
    });

    afterEach(()=>{
        sinon.restore();
        // resStatusSpy.restore();

    });

    describe("transfer detail with sessionstart fail", ()=>{
        it("it should return 500 status with endSession not not called", async()=>{
            startSessionStub.throws();
            await notifyTransactionController.transferFund(req, res);

            sinon.assert.calledOnce(startSessionStub);
            sinon.assert.notCalled(endSessionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 500);

            // accountStub.restore();
        });
    });

    describe("transfer detail with startTransaction fail", ()=>{
        it("it should return 500 status with endSession called and close session in order", async()=>{
            startTranscStub.throws();
            await notifyTransactionController.transferFund(req, res);

            sinon.assert.calledOnce(startSessionStub);
            sinon.assert.calledOnce(abortTranscStub);
            sinon.assert.calledOnce(endSessionStub);

            sinon.assert.callOrder(abortTranscStub, endSessionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 500);

            // accountStub.restore();
        });
    });

    describe("transfer detail with db fail", ()=>{
        it("it should return 500 status with abortTransaction called and close session in order", async()=>{
            accountModelFindOneStub.throws();
            await notifyTransactionController.transferFund(req, res);

            sinon.assert.called(accountModelFindOneStub);
            sinon.assert.calledOnce(startSessionStub);
            sinon.assert.calledOnce(abortTranscStub);
            sinon.assert.calledOnce(endSessionStub);

            sinon.assert.callOrder(
                startSessionStub,
                accountModelFindOneStub,
                abortTranscStub,
                endSessionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 500);

            // accountStub.restore();
        });
    });

    describe("transfer detail with db null return", ()=>{
        it("it should return 400 status with abortTransaction called and close session in order", async()=>{
            accountModelSession.returns(null);
            await notifyTransactionController.transferFund(req, res);

            sinon.assert.called(accountModelFindOneStub);
            sinon.assert.calledOnce(startSessionStub);
            sinon.assert.calledOnce(abortTranscStub);
            sinon.assert.calledOnce(endSessionStub);

            sinon.assert.callOrder(
                startSessionStub,
                accountModelFindOneStub,
                abortTranscStub,
                endSessionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 400);

            // accountStub.restore();
        });
    });

    describe("transfer detail with diffrent curreny request than account", ()=>{
        it("it should return 400 bad request with abort called and close session in order", async()=>{
            accountModelSession.returns(Promise.resolve({
                balance_amount: 100,
                limit_amount: 200,
                lien_amount: 10,
                currency:{
                    _id: "YEN",
                    rate_refto_usd: 1
                },
                save: dbSaveStub
            }));
            await notifyTransactionController.transferFund(req, res);

            sinon.assert.called(accountModelFindOneStub);
            sinon.assert.calledOnce(startSessionStub);
            sinon.assert.notCalled(commitTranscStub);
            sinon.assert.calledOnce(abortTranscStub);
            sinon.assert.calledOnce(endSessionStub);

            sinon.assert.callOrder(
                startSessionStub,
                accountModelFindOneStub,
                abortTranscStub,
                endSessionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 400);

            // accountStub.restore();
        });
    });

    describe("transfer detail with low balance", ()=>{
        it("it should return 400 bad request with abort called and close session in order", async()=>{
            accountModelSession.returns(Promise.resolve({
                balance_amount: 1,
                limit_amount: 1,
                lien_amount: 1,
                currency:{
                    _id: "USD",
                    rate_refto_usd: 1
                },
                save: dbSaveStub
            }));
            await notifyTransactionController.transferFund(req, res);

            sinon.assert.called(accountModelFindOneStub);
            sinon.assert.calledOnce(startSessionStub);
            sinon.assert.notCalled(commitTranscStub);
            sinon.assert.notCalled(dbSaveStub);
            sinon.assert.calledOnce(abortTranscStub);
            sinon.assert.calledOnce(endSessionStub);

            sinon.assert.callOrder(
                startSessionStub,
                accountModelFindOneStub,
                abortTranscStub,
                endSessionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 400);

            // accountStub.restore();
        });
    });

    describe("transfer detail with second db call failed", ()=>{
        it("it should return 400 bad request with abort called and not saved", async()=>{
            accountModelSession.onCall(0).returns(sinon.stub());
            accountModelSession.onCall(1).returns(null);
            await notifyTransactionController.transferFund(req, res);

            sinon.assert.called(accountModelFindOneStub);
            sinon.assert.calledOnce(startSessionStub);
            sinon.assert.notCalled(commitTranscStub);
            sinon.assert.notCalled(dbSaveStub);
            sinon.assert.calledOnce(abortTranscStub);
            sinon.assert.calledOnce(endSessionStub);

            sinon.assert.callOrder(
                startSessionStub,
                accountModelFindOneStub,
                abortTranscStub,
                endSessionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 400);

            // accountStub.restore();
        });
    });

    describe("transfer detail with db stub return same currency", ()=>{
        it("it should return 200 status with commit called and close session in order", async()=>{
            accountModelSession.returns(Promise.resolve({
                balance_amount: 100,
                limit_amount: 200,
                lien_amount: 10,
                currency:{
                    _id: "USD",
                    rate_refto_usd: 1
                },
                save: dbSaveStub
            }));
            await notifyTransactionController.transferFund(req, res);

            sinon.assert.called(accountModelFindOneStub);
            sinon.assert.calledOnce(startSessionStub);
            sinon.assert.calledOnce(commitTranscStub);
            sinon.assert.notCalled(abortTranscStub);
            sinon.assert.calledOnce(endSessionStub);

            sinon.assert.callOrder(
                startSessionStub,
                accountModelFindOneStub,
                commitTranscStub,
                endSessionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 200);

            // accountStub.restore();
        });
    });

    describe("transfer detail with db stub return diffrent currency", ()=>{
        it("it should return 200 status with commit called and close session in order", async()=>{
            accountModelSession.onCall(0).returns(Promise.resolve({
                balance_amount: 100,
                limit_amount: 200,
                lien_amount: 10,
                currency:{
                    _id: "INR",
                    rate_refto_usd: 1
                },
                save: dbSaveStub
            }));
            accountModelSession.onCall(1).returns(Promise.resolve({
                balance_amount: 100,
                limit_amount: 200,
                lien_amount: 10,
                currency:{
                    _id: "USD",
                    rate_refto_usd: 1
                },
                save: dbSaveStub
            }));
            await notifyTransactionController.transferFund(req, res);

            sinon.assert.called(accountModelFindOneStub);
            sinon.assert.calledOnce(startSessionStub);
            sinon.assert.calledOnce(commitTranscStub);
            sinon.assert.notCalled(abortTranscStub);
            sinon.assert.calledOnce(endSessionStub);

            sinon.assert.callOrder(
                startSessionStub,
                accountModelFindOneStub,
                commitTranscStub,
                endSessionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 200);

            // accountStub.restore();
        });
    });
});