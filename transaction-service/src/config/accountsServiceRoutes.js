

const basePath= process.env.ACCOUNTS_SERVICE_BASE_LOCATION || "http://localhost:3000";

const accountsServiceRoutes={
    notifyTransfer: `${basePath}/notify/transaction`
}

module.exports= accountsServiceRoutes;