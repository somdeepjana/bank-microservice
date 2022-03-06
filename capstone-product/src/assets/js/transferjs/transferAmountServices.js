var transferAmountComponent = null;

/**
 * Function to initiate the transfer amount
 */
function transferAmountLoadAccounts(){
  var data = JSON.parse(atob(sessionStorage.getItem('ac_data')));
  var app_str = "<option selected value='-1'>select account number</option>";
  for (var i = 0; i < data.length; i++){
    app_str += "<option value='"+i+"'>"+data[i]['account_id']+"</option>"
  }
  document.getElementById('fromAccountNumber').innerHTML = app_str;
  document.getElementById('transferAmountLanding').style.display="block";
  document.getElementById('transferLoadbtn').style.display="none";
}

/**
 * Function to check variables
 */

function validateFRomAccountNumber(acnum){

  //validations
  if (acnum.localeCompare('-1') == 0){
    return false;
  }
  // Other validations cases here

  return true;
}

/**
 * Function to validate to account number
 */
function validateToAccountNumber(acnum){

  //validations
  if ((acnum.localeCompare("") == 0) || (acnum.localeCompare(" ") == 0)){
    return false;
  }

  return true;
}

/**
 * Functionto validate amount
 */
function validateAmount(amt){

  // validates
  if ((amt.localeCompare('0') == 0) || (amt.match(/[-]/) != null)){
    return false;
  }
  return true;
}
/**
 * Function to chaeck if to and from accounts are not same
 */
function validateAccountsNotSame(ac1, ac2){
  //alert(ac1+"\n"+ac2);
  if (ac1.localeCompare(ac2) == 0){
    return false;
  }
  return true;
}

/**
 * Fnction to fetch the data from ui
 */
function getTranferData(){
  var ac_id = JSON.parse(atob(sessionStorage.getItem('ac_data')));
  var fromAcc = document.getElementById('fromAccountNumber').value;
  var toAcc = document.getElementById('toAccountNumber').value;
  //var transferAmount = document.getElementById('amount').value;

  //code to verify the data is valid
  if (!validateFRomAccountNumber(fromAcc)){
    alert("Please select the from account id");
    //$("#transferAmountSelectErr").text("Please select the from account number").show().fadeOut(2000);
    return null;
  }
  if (!validateToAccountNumber(toAcc)){
    alert("Please enter valid to account");
    //$("#transferAmountToErr").text("Please enter valid to account number").show().fadeOut(2000);
    return null;
  }
  if (!validateAccountsNotSame(ac_id[parseInt(fromAcc)]['account_id'], toAcc)){
    alert("From and To accounts should not be same");
    //$("#transferAmountToErr").text("").show("From and To accounts should not be same").fadeOut(2000);
    return null;
  }

  /*if (!validateAmount(transferAmount)){
    alert("Please enter valid amount");
    return null;
  }*/

  var ret_data = {
    from: ac_id[parseInt(fromAcc)]['account_id'],
    to: toAcc,
    //amt: transferAmount
  }
  return ret_data;
}
/**
 * Function to verify accounts are right
 */
function transferValidateAccount(){
  var transferData = getTranferData();
  //console.log("\n\n---\n"+JSON.stringify(transferData)+"\n----\n\n");
  //return;
  if (transferData){

    $.ajax({
      type:'GET',
      url: window.env.checkAccountsUrl+transferData['to'],//'http://localhost:3000/details/check/'+transferData['to'],
      headers: {
        "Authorization": "Bearer "+keycloakobj.token,
        'Content-Type':'application/json'
      },
      success: function(resp){
        //alert("success");
        //console.log(resp);
        sessionStorage.setItem("transfer_data", btoa(JSON.stringify(transferData)));

        transferAmountComponent.transferRedirect("transactipon-page2");
        //console.log(JSON.stringify(resp));
      },
      error: function(err){
        //alert("Error");
        //console.log("[ERROR] error occured:\n\n"+JSON.stringify(err));
        //console.log(JSON.stringify(err));
        transferMainErrorHandler(err, "transferErr");
      }
    });
  }
}

/**
 * Function to display success data
 */

var displayTransferData = () =>{



  if (sessionStorage.getItem("transfer_status") === null){
    console.log("DULL sale");
    var msg = {err: "No data found"};
    transferDetailsErrorHandler(msg);
    return;
  }
  var raw_data = sessionStorage.getItem("transfer_status");

  var data = JSON.parse(atob(raw_data))["transaction_details"];

  //document.getElementById("fromAccountNumber").innerHTML = data["from_account"];
  $("#fromAccountNumber").html(data["from_account"]);
  //document.getElementById("toAccountNumber").innerHTML = data["to_account"];
  $("#toAccountNumber").html(data["to_account"]);
  //document.getElementById("status").innerHTML = data["transaction_status"];
  $("#status").html(data["transaction_status"]);
  //document.getElementById("amount").innerHTML = data["amount"];
  var pre = "<span class='badge badge-pill badge-success'>"+data["transac_currency"]+"</span>";
  $("#amount").html(pre+"&nbsp;"+data["amount"]);
  //document.getElementById("transactionId").innerHTML = data["transaction_id"];
  $("#transactionId").html(data["transaction_id"]);
  //$("#currency").html(data["transac_currency"]);

  $("#trnsferReportLoad").css("display", "none");
  $("#transferContent").css("display", "block");

  //document.getElementById("trnsferReportLoad").style.display="none";
  //document.getElementById("transferContent").style.display = "block";

}

/**
 * Functio to fetch the currency data for a account
 */
function fetch_currency_data(acc_id){
  $.ajax({
    type: 'GET',
    url: window.env.checkAccountsUrl+acc_id,//"http://localhost:3000/details/check/"+acc_id,
    headers: {
      "Authorization": "Bearer "+keycloakobj.token,
      'Content-Type':'application/json'
    },
    success: function(resp){
      //console.log(JSON.stringify(resp));
      //console.log(resp['currency']);

      $('#transferCurrency').append("<option value="+resp['currency']+">"+resp['currency']+"</option>");
      //return resp['currency'];
    },
    error: function(err){
      transferAmountPage2ErrorHandler(err);
      //return null;
    }
  });
}

/**
 * Function to load the curreny values for transform data
 */
function transferAmountLoad(){
  if (sessionStorage.getItem('transfer_data') === null){
    transferAmountComponent.transferRedirect('main');
  }
  var transfer_data = JSON.parse(atob(sessionStorage.getItem("transfer_data")));

  //transfer_data['currencies'] =
  fetch_currency_data(transfer_data['from']);
  fetch_currency_data(transfer_data['to']);
}

/**
 * Function to transfer the amount to the target account
 */
function transferAmount(){

  if (sessionStorage.getItem("transfer_data") === null){
    transferAmountComponent.transferRedirect('main');
  }
  var transferData = JSON.parse(atob(sessionStorage.getItem('transfer_data')));

  var currencySelected = $("#transferCurrency").val();
  var amt = $("#amount").val();
  if (!validateAmount(amt)){
    $("#transferAmoutPage2Err").html("Plaese enter valid amount");
    $("#transferAmoutPage2Err").css("display", "block");
    return;
  }
  $.ajax({
    type: 'POST',
    url: window.env.transferUrl,//'http://localhost:3001/transaction/createtransaction',
    headers: {
      "Authorization": "Bearer "+keycloakobj.token,
      'Content-Type':'application/x-www-form-urlencoded'
    },
    data:{
      from_account_id: transferData['from'],
      to_account_id: transferData['to'],
      amount: amt,
      transac_currency: currencySelected
    },
    success: function(resp){
      //alert("success");
      //console.log(resp);
      //console.log(resp);
      sessionStorage.setItem("transfer_status", btoa(JSON.stringify(resp)));

      transferAmountComponent.transferRedirect("transferamountdetails");

    },
    error: function(err){
      //alert("Error");
      //console.log("[ERROR] error occured:\n\n"+JSON.stringify(err));
      transferMainErrorHandler(err, "transferAmoutPage2Err");
    }

  });
}
