/**
 * Function to log error of checkbalance pages
 */
function checkBalanceErrorhandler(err){

  var message = "";
  switch(err['errorCode']){
    case 1:
            message = err['message'];
            break;
    default:
            message = JSON.stringify(err);
  }

  $("#balanceCheckErr").css('display', "block");
  $('#balanceCheckErr').html(message);
}

function checkBalanceDetailsErrorHandler(err){
  $("#checkBalanceDetailsError").css("display", "block");
  $("#checkBalanceDetailsError").html(Json.stringify(err));
}
