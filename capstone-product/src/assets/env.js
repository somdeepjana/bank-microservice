(function(window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["getAccountsUrl"] = "http://localhost/am/details/accounts/";
  window["env"]["checkAccountsUrl"] = "http://localhost/am/details/check/";
  window["env"]["transferUrl"] = "http://localhost/tm/transaction/createtransaction";
  window["env"]["miniStatementsUrl"] = "http://localhost/tm/transaction/statement/";
  window["env"]["realm"] = "bank-app";
  window["env"]["auth_server_url"] = "http://localhost/auth/";
  window["env"]["ssl_required"] = "external";
  window["env"]["resource"] = "web-app";
  window["env"]["public_client"] = true;
  window["env"]["confidential_port"] = 0;
  window["env"]["redirect_uri"] = "http://localhost/main";
})(this);
