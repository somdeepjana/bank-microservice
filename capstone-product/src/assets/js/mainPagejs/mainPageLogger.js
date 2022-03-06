/**
 * Function to handle error for main component
 */
function mainComponentErrorHandler(jqXHR, exception){
  //console.log(exception);
  message = '';
  switch(jqXHR.status){
    case 0:
            message = "Server not available";
            break;
    case 404:
            message = "Request page not found";
            break;
    case 403:
            message = "Not a valid User plaease logout and login"
            break;
    case 500:
            message = "Server not responding please try after some time";
            break;
    case 403:
            message = "Access denaid please verify user";
            break;
    case 'timeout':
            message = "Timeout Please try again";
            break;
    case 'abort':
            message = "REquet aborted";
            break;
    default:
            message = "Something went wrong<br>"+jqXHR.responseText;


  }
  //console.log(message);
  //console.log("\n\n"+jqXHR.responseText+"\n\n");
  $("#mainComponentErr").css("display", "block");
  $("#mainComponentErr").html(message);
}
