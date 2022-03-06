class MiniStatementDto{
    account_id;
    balance_amount;
    limit_amount;
    lien_amount;
    currency;

    transactions;

    constructor(sourceAccount, transactions){
        this.account_id= sourceAccount.account_id;
        this.balance_amount= sourceAccount.balance_amount;
        this.limit_amount= sourceAccount.limit_amount;
        this.lien_amount= sourceAccount.lien_amount;
        this.currency= sourceAccount.currency;

        this.transactions= transactions;
    }
}

module.exports= MiniStatementDto;