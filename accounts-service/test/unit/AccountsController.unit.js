require("dotenv").config();
process.env.NODE_ENV = "test";

const sinon= require("sinon");

const {AccountModel}= require("../../src/services/mongoose").models;
const accountController= require("../../src/routes/Accounts/AccountsController");

describe("Accounts Controller", ()=>{

    let req;

    let res={};
    let resStatusSpy;
    let resJsonSpy;

    let spyObj;

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
            params:{
                accountId: "testAccount"
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
    });

    afterEach(()=>{
        sinon.restore();
        // resStatusSpy.restore();

    });

    describe("Get all accounts detail with none return", ()=>{
        it("it should return 404 status", async()=>{
            const accountStub= sinon.stub(AccountModel, "find").returns([]);
            await accountController.allAccounts(req, res);

            sinon.assert.calledOnce(accountStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 404);

            // accountStub.restore();
        });
    });

    describe("Get all accounts throw db error", ()=>{
        it("it should return 500 status", async()=>{
            const accountStub= sinon.stub(AccountModel, "find").throws();
            await accountController.allAccounts(req, res);

            sinon.assert.calledOnce(accountStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 500);

            // accountStub.restore();
        });
    });

    describe("Get all accounts with proper data", ()=>{
        it("it should return 200 status", async()=>{
            const accountStub= sinon.stub(AccountModel, "find").returns([spyObj]);
            await accountController.allAccounts(req, res);

            sinon.assert.calledOnce(accountStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 200);

            // accountStub.restore();
        });
    });

    describe("Get account details with none return", ()=>{
        it("it should return 404 status", async()=>{
            const accountStub= sinon.stub(AccountModel, "findOne").returns(null);
            await accountController.getAccountById(req, res);

            sinon.assert.calledOnce(accountStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 404);

            // accountStub.restore();
        });
    });

    describe("Getaccount details throw db error", ()=>{
        it("it should return 500 status", async()=>{
            const accountStub= sinon.stub(AccountModel, "findOne").throws();
            await accountController.getAccountById(req, res);

            sinon.assert.calledOnce(accountStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 500);

            // accountStub.restore();
        });
    });

    describe("Getaccount details return proper data", ()=>{
        it("it should return 200 status", async()=>{
            const accountStub= sinon.stub(AccountModel, "findOne").returns(spyObj);
            await accountController.getAccountById(req, res);

            sinon.assert.calledOnce(accountStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 200);

            // accountStub.restore();
        });
    });

    describe("Check account currency with none return", ()=>{
        it("it should return 404 status", async()=>{
            const accountStub= sinon.stub(AccountModel, "findOne").returns(null);
            await accountController.checkAccountCurrency(req, res);

            sinon.assert.calledOnce(accountStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 404);

            // accountStub.restore();
        });
    });

    describe("Check account currency throw db error", ()=>{
        it("it should return 500 status", async()=>{
            const accountStub= sinon.stub(AccountModel, "findOne").throws();
            await accountController.checkAccountCurrency(req, res);

            sinon.assert.calledOnce(accountStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 500);

            // accountStub.restore();
        });
    });

    describe("Check account currency with proper data", ()=>{
        it("it should return 200 status", async()=>{
            const accountStub= sinon.stub(AccountModel, "findOne").returns(spyObj);
            await accountController.checkAccountCurrency(req, res);

            sinon.assert.calledOnce(accountStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 200);

            // accountStub.restore();
        });
    });
});