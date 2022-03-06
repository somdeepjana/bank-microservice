require("dotenv").config();
process.env.NODE_ENV = "test";
process.env.SQLDB_CONNECTION_STRING= "sqlite::memory:"

const sinon= require("sinon");

const sequelize= require("../../src/sequelize");
const AccountModel= sequelize.models.account;
const TransactionModel= sequelize.models.transaction;

const ministatementController= require("../../src/routes/Ministatement/MinistatementController");

describe("Ministatement Controller", ()=>{

    let req;

    let res={};
    let resStatusSpy;
    let resJsonSpy;

    let spyObj;

    let accountStub;
    let transactionStub;

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

        accountStub= sinon.stub(AccountModel, "findOne");
        transactionStub= sinon.stub(TransactionModel, "findAll");
    });

    afterEach(()=>{
        sinon.restore();
        // resStatusSpy.restore();

    });

    describe("Get ministatement with  accounts db error", ()=>{
        it("it should return 500 internal server error", async()=>{
            accountStub.throws();
            await ministatementController.getStatement(req, res);

            sinon.assert.calledOnce(accountStub);
            sinon.assert.notCalled(transactionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 500);

            // accountStub.restore();
        });
    });

    describe("Get ministatement with accounts db return null", ()=>{
        it("it should return 400 bad request", async()=>{
            accountStub.returns(null);
            await ministatementController.getStatement(req, res);

            sinon.assert.calledOnce(accountStub);
            sinon.assert.notCalled(transactionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 404);

            // accountStub.restore();
        });
    });

    describe("Get ministatement with transaction db error", ()=>{
        it("it should return 500 internal server error", async()=>{
            accountStub.returns(sinon.stub());
            transactionStub.throws();
            await ministatementController.getStatement(req, res);

            sinon.assert.calledOnce(accountStub);
            sinon.assert.calledOnce(transactionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 500);

            // accountStub.restore();
        });
    });

    describe("Get ministatement with transaction db return data", ()=>{
        it("it should return 200 ok with data", async()=>{
            accountStub.returns(sinon.stub());
            transactionStub.returns([sinon.stub()]);
            await ministatementController.getStatement(req, res);

            sinon.assert.calledOnce(accountStub);
            sinon.assert.calledOnce(transactionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 200);
            sinon.assert.calledOnce(resJsonSpy);

            // accountStub.restore();
        });
    });

    describe("Get ministatement with transaction db cotain debit transac", ()=>{
        it("it should return 200 ok with data", async()=>{
            accountStub.returns(sinon.stub());
            transactionStub.returns(Promise.resolve([{
                fromaccount_id: "testAccount"
            }]));
            await ministatementController.getStatement(req, res);

            sinon.assert.calledOnce(accountStub);
            sinon.assert.calledOnce(transactionStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 200);
            sinon.assert.calledOnce(resJsonSpy);

            // accountStub.restore();
        });
    });
});