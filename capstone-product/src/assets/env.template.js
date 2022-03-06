(function(window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["getAccountsUrl"] = "${GET_ACCOUNTS_URL}";
  window["env"]["checkAccountsUrl"] = "${CHECK_ACCOUNTS_URL}";
  window["env"]["transferUrl"] = "${TRANSFER_URL}";
  window["env"]["miniStatementsUrl"] = "${MINISTATEMENT_URL}";
  window["env"]["realm"] = "${REALM}";
  window["env"]["auth_server_url"] = "${AUTH_SERVER_URL}";
  window["env"]["ssl_required"] = "${SSL_REQUIRED}";
  window["env"]["resource"] = "${RESOURCE}";
  window["env"]["public_client"] = "${PUBLIC_CLIENT}";
  window["env"]["confidential_port"] = "${CONFIDENTIAL_PORT}";
  window["env"]["redirect_uri"] = "${REDIRECT_URI}";

})(this);
