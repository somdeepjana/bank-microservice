/**
 * Authentication using keycloack.
 */

var headerCmponent = null;
window.user_loggedin = false;
var key_cloak_jaon_data = null;
try{
  key_cloak_jaon_data = {
    url: window.env.auth_server_url,
    realm: window.env.realm,
    clientId: window.env.resource
  }
}
catch{
  console.log("[IGNORED]");
}
/*var key_cloak_jaon_data = {
  url: window.env.auth_server_url,
  realm: window.env.realm,
  clientId: window.env.resource
}*/
//window.keycloakobj = new Keycloak('http://localhost:4200/assets/keycloak.json');
window.keycloakobj = new Keycloak(key_cloak_jaon_data);

function login_success(){
  //alert('session running');
  //console.log(keycloakobj.token);
  $('#logoutBtn').css("display", "block");
  $('#loginbtn').css("display", "none");
  $('#homeBtn').css("display", "block");
  user_loggedin = true;
}

function logout_success(){
  alert('please login');
  $('#logoutBtn').css("display", "none");
  $('#loginbtn').css("display", "block");
  $('#homeBtn').css("display", "none");
  user_loggedin = false;
}

function initKeycloak() {
  keycloakobj.init({ flow: 'implicit', onLoad: 'login-required'}).then(function(auth) {

        if (auth){
          //alert('session running');
          //console.log(keycloakobj.token);
          $('#logoutBtn').css("display", "block");
          $('#loginbtn').css("display", "none");
          $('#homeBtn').css("display", "block");
          user_loggedin = true;
          headerCmponent.goToPage3('main');
        }
        else{
          setTimeout(function(){
            if (keycloakobj.authenticated){
              $('#logoutBtn').css("display", "block");
                  $('#loginbtn').css("display", "none");
                  $('#homeBtn').css("display", "block");
                  user_loggedin = true;
                  headerCmponent.goToPage3('main');
                  return;
            }
          }, 100);
          console.log("\n[Failes to login]\n")
          console.log(keycloakobj.authenticated);
          //window.location.replace("http://localhost:8080/auth/realms/bank-app/protocol/openid-connect/auth?response_type=token&client_id=web-app&redirect_uri=http://localhost:4200/main");
        }


  }).catch(function() {
    setTimeout(function(){
      if (keycloakobj.authenticated){
        $('#logoutBtn').css("display", "block");
            $('#loginbtn').css("display", "none");
            $('#homeBtn').css("display", "block");
            user_loggedin = true;
            headerCmponent.goToPage3('main');
            return;
      }
    }, 100);

      alert('failed to login');
      $('#logoutBtn').css("display", "none");
      $('#loginbtn').css("display", "block");
      $('#homeBtn').css("display", "none");
      user_loggedin = false;
  });
}

function logout() {
  //
  //alert("Logged Out");
  console.log("[INFO]: Logged out");
  user_loggedin = false;
  localStorage.removeItem('first');
  var logoutOptions = { redirectUri : "http://localhost/" };
  keycloakobj.logout(logoutOptions);
  //keycloakobj.authenticated = false;
  //localStorage.removeItem('sec');
  //window.location.replace('http://localhost:8080/auth/realms/bank-app/protocol/openid-connect/logout?redirect_uri=http://localhost:4200/');
  //window.location.replace(window.env.auth_server_url+'realms/bank-app/protocol/openid-connect/logout?redirect_uri='+window.env.redirect_uri);
  //window.location.replace("http://localhost/logout/");
}

/*$(document).ready(function(){
  if(localStorage.getItem('first') === null){
    initKeycloak();
    localStorage.setItem('first',"1");
  }

});*/

