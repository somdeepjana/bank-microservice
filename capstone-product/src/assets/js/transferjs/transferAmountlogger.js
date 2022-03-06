/**
 * Function to handle and log a errors in trnsferamount pages
 */
function transferMainErrorHandler(err, id){

  var message = "";
  try{
    //console.log("\n\n"+JSON.stringify(err)+"\n\n");
    var responseData = err['responseJSON'];
    //console.log(responseData);
    switch(responseData['errorCode']){
      case 500:
                message = "To Account Is Invalid";
                break;
      case 5:
              message = responseData['message'];
              break;
      case 2:
              message = "To Account Is Invalid";
              break;
      default:
              message = err['responseText'];
              break;
    }
  }
  catch (exception){
    message += err['responseText'];
  }

  $("#"+id).css("display", "block");
  $("#"+id).html(message);
}

/**
 * Function to display the errors in details page
 */
function transferDetailsErrorHandler(err){
  $("#transferDetailserr").css("display", "none");
  $("#transferDetailserr").html(JSON.stringify(err));
}

/**
 * Functio to log errors in amount selection page
 */

function transferAmountPage2ErrorHandler(err){
  $("#transferAmoutPage2Err").css("display", "block");
  $("#transferAmoutPage2Err").html("Something went wrong </br> please try again after some time");
  console.log(JSON.stringify(err));
}
