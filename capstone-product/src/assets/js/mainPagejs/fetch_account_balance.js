var mainComponent = null;
var checkBalanceComponent = null;
/**
 * Function to load the account details and redirect to specified page
 */
function fetch_account_details(redirect){
  if (!keycloakobj.authenticated){
    logout();
  }
  //alert(window.env.getAccountsUrl);

  $.ajax({
    type:'GET',
    url: window.env.getAccountsUrl,//'http://localhost:3000/details/accounts/',
    headers: {
      "Authorization": "Bearer "+keycloakobj.token,
      'Content-Type':'application/json'
    },
    success: function(resp){
      var dataobj = JSON.stringify(resp);
      var database64obj = btoa(dataobj);
      mainComponent.goToPage(redirect, database64obj);
    },
    error: function(jqXHR, exception){
      //console.log("[ERROR] error occured:"+JSON.stringify(err));
      mainComponentErrorHandler(jqXHR, exception);
    }
  });
}
