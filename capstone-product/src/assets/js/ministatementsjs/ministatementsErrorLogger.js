/**
 * Function to log error in ministatements main page
 */
function miniStatementsMainErrorHandler(err, id){
  $('#'+id).css("display", "block");
  $("#"+id).html(JSON.stringify(err));
}
