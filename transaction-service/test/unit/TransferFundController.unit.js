require("dotenv").config();
process.env.NODE_ENV = "test";
process.env.SQLDB_CONNECTION_STRING= "sqlite::memory:"

const sinon= require("sinon");

const sequelize= require("../../src/sequelize");
const AccountModel= sequelize.models.account;
const TransactionModel= sequelize.models.transaction;
const CurrencyRate= sequelize.models.currency_rate;

const axios= require("axios").default;

const transferFundController= require("../../src/routes/TransferFund/TransferFundController");

describe("Transferfund Controller", ()=>{

    let req;

    let res={};
    let resStatusSpy;
    let resJsonSpy;

    let spyObj;

    let seqTransacSpy;
    let axiosPostStub;

    let accountFindByPkStub;
    let accountUpdateStub;
    let currencyRateFindByPkStub;
    let transactionUpdateStub;
    let transactionCreateStub;

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
            },
            body:{
                from_account_id: "testFromAccount",
                to_account_id: "testToAccount",
                amount: 5,
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

        axiosPostStub= sinon.stub(axios, "post")
            .returns({
                data:{
                    to_account:{
                        currency: "USD",
                    },
                    from_account:{
                        account_id: "testFromAccountId",
                        balance_amount: 100,
                        limit_amount: 200,
                        lien_amount: 10
                    },
                    status: "COMPLETE",
                    conversion_rate: 1
                }
            });
        seqTransacSpy= sinon.stub(sequelize, "transaction").yields(null);

        accountFindByPkStub= sinon.stub(AccountModel, "findByPk");
        accountUpdateStub= sinon.stub(AccountModel, "update");
        currencyRateFindByPkStub= sinon.stub(CurrencyRate, "findByPk")
            .returns({
                currency_code: "USD"
            });
        transactionUpdateStub= sinon.stub(TransactionModel, "update")
            .returns(sinon.stub())
        transactionCreateStub= sinon.stub(TransactionModel, "create")
            .returns({
                id:"testId",
                update: transactionUpdateStub
            });
    });

    afterEach(()=>{
        sinon.restore();
        // resStatusSpy.restore();

    });

    describe("transfer fund with  accounts db error if no currency provided", ()=>{
        it("it should return 500 internal server error", async()=>{
            req.body.transac_currency="";
            accountFindByPkStub.throws();
            await transferFundController.initiateTransfer(req, res);

            sinon.assert.calledOnce(accountFindByPkStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 500);

            // accountStub.restore();
        });
    });

    describe("transfer fund with  accounts db return null if no currency provided", ()=>{
        it("it should return 400 bad request", async()=>{
            req.body.transac_currency="";
            accountFindByPkStub.returns(null);
            await transferFundController.initiateTransfer(req, res);

            sinon.assert.called(accountFindByPkStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 400);

            // accountStub.restore();
        });
    });

    describe("transfer fund with one wrong account id if no currency provided", ()=>{
        it("it should return 400 bad request", async()=>{
            req.body.transac_currency="";
            accountFindByPkStub.onCall(0).returns(sinon.stub());
            accountFindByPkStub.onCall(1).returns(null);
            await transferFundController.initiateTransfer(req, res);

            sinon.assert.called(accountFindByPkStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 400);

            // accountStub.restore();
        });
    });

    describe("transfer fund with unmatch account currency if no currency provided", ()=>{
        it("it should return 400 bad request", async()=>{
            req.body.transac_currency="";
            accountFindByPkStub.onCall(0).returns({
                currency: "USD"
            });
            accountFindByPkStub.onCall(1).returns({
                currency: "YEN"
            });
            await transferFundController.initiateTransfer(req, res);

            sinon.assert.calledTwice(accountFindByPkStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 400);

            // accountStub.restore();
        });
    });

    describe("transfer fund with db error currency provided", ()=>{
        it("it should return 500 internal server error", async()=>{
            req.body.transac_currency= "USD"
            currencyRateFindByPkStub.throws();
            await transferFundController.initiateTransfer(req, res);

            sinon.assert.calledOnce(currencyRateFindByPkStub);
            sinon.assert.notCalled(accountFindByPkStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 500);

            // accountStub.restore();
        });
    });

    describe("transfer fund with db return null currency provided", ()=>{
        it("it should return 400 bad request", async()=>{
            req.body.transac_currency= "USD"
            currencyRateFindByPkStub.returns(null);
            await transferFundController.initiateTransfer(req, res);

            sinon.assert.calledOnce(currencyRateFindByPkStub);
            sinon.assert.notCalled(accountFindByPkStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 400);

            // accountStub.restore();
        });
    });

    describe("transfer fund with proper data and currency provided", ()=>{
        it("it should return 200 ok", async()=>{

            await transferFundController.initiateTransfer(req, res);

            // sinon.assert.calledOnce(currencyRateFindByPkStub);
            // sinon.assert.notCalled(accountFindByPkStub);

            sinon.assert.calledOnce(resStatusSpy);
            sinon.assert.calledWith(resStatusSpy, 200);

            // accountStub.restore();
        });
    });
});