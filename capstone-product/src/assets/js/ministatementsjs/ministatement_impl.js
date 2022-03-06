/**
 * Function for displaying the account details
 */
var miniStatementComponent = null;

function load_mini_accounts(){
  if (sessionStorage.getItem('ac_data') === null){
    var msg = {
      errorCode: 0,
      message: "No data Found please login again"
    };
    miniStatementsMainErrorHandler(msg, 'miniStatementErr');
  }
  var data = JSON.parse(atob(sessionStorage.getItem('ac_data')));
  //alert(JSON.stringify(data));
  var app_str = "<option selected value='-1'>select account number</option>";
  for (var i = 0; i < data.length; i++){
    app_str += "<option value='"+i+"'>"+data[i]['account_id']+"</option>"
  }
  document.getElementById('mini_accountNumber').innerHTML = app_str;
  document.getElementById('ministatement_select_account').style.display="block";
  document.getElementById('mini_load_btn').style.display="none";
}

/**
 * Function for displaying the ministatements
 */
var miniStatementAccountSelection = 0;

function display_mini_statements(){
  miniStatementAccountSelection = document.getElementById('mini_accountNumber').value;

  if (miniStatementAccountSelection.localeCompare('-1') == 0){
    alert("Please select account number");
    //$("#ministatementSelectErr").text("Please select account number").show().fadeOut(2000);
  }
  else{
    var selec_id = parseInt(miniStatementAccountSelection);
    //var data = getMiniStatements(selec_id);
    miniStatementComponent.goToDetailsPage("ministatementdetails", miniStatementAccountSelection);
  }
}


/**
 * Function to fetch the ministatements
 */

function getMiniStatements(acID){
  $.ajax({
    type:'GET',
    url: window.env.miniStatementsUrl+acID,//'http://localhost:3001/transaction/statement/'+acID,
    headers: {
      "Authorization": "Bearer "+keycloakobj.token,
      'Content-Type':'application/json'
    },
    success: function(resp){

      return resp["transactions"];

      //mainComponent.goToPage(redirect, database64obj);
    },
    error: function(err){
      console.log("[ERROR] error occured:"+JSON.stringify(err));
      return null;
    }
  });
}

/**
 * Function to display last 10 transactions
 */
function display_ministatements(){
  var data = JSON.parse(atob(sessionStorage.getItem("ac_data")));
  //console.log(data[miniStatementAccountSelection]);
  var data = data[miniStatementAccountSelection];
  document.getElementById('accountNumber').innerHTML = "<b>"+data['account_id']+"</b>";
  var pre = "<span class='badge badge-pill badge-success'>"+data['currency']+"</span>";
  document.getElementById('amount').innerHTML = pre +"&nbsp;&nbsp;<b>"+data['effective_balance']+"</b>";
  //$("#currencyType").html(data['currency']);

  /**
   * make a ajsx call to transaction service to get the user selected data
   */
  $.ajax({
    type:'GET',
    url: window.env.miniStatementsUrl+data['account_id'],//'http://localhost:3001/transaction/statement/'+data['account_id'],
    headers: {
      "Authorization": "Bearer "+keycloakobj.token,
      'Content-Type':'application/json'
    },
    success: function(resp){
      var data = resp['transactions'];
      items = [];
      if (data.length <= 0 || data===null){
        document.getElementById('miniStatementContent').style.display = 'block';
        miniStatementsMainErrorHandler("No Data Fond", 'miniStatementDetailsErr');
        return;
      }
      //console.log(JSON.stringify(data));
      for (var i = 0; i < data.length; i+=1){
        row = "<tr>";

        row += "<td>"+data[i]['transaction_id']+"</td>";
        row += "<td>"+data[i]['from_account']+"</td>";
        row += "<td>"+data[i]['to_account']+"</td>";
        row += "<td>"+data[i]['toaccount_currency']+"</td>";
        var badge_currency = "<span class='badge badge-pill badge-success'>"+data[i]['transac_currency']+"</span>";
        row += "<td>"+badge_currency+"&nbsp;"+data[i]['amount']+"</td>";
        row += "<td>"+data[i]['type']+"</td>";
        row += "<td>"+data[i]['transaction_status']+"</td>";
        row += "<td>"+data[i]['conversion_rate']+"</td>";
        row += "<td>"+data[i]['requested_at']+"</td>";
        row += "<td>"+data[i]['updated_at']+"</td>";

        row += "</tr>";
        items.push(row);
      }

      $('#miniStatementData').find('tbody').empty();
      $('<tbody/>', {
        html: items.join('')
      }).appendTo('#miniStatementData');

      document.getElementById('miniStatementContent').style.display = 'block';
      document.getElementById('ministatementLoadBtn').style.display = 'none';

      //mainComponent.goToPage(redirect, database64obj);
    },
    error: function(err){
      console.log("[ERROR] error occured:"+JSON.stringify(err));
      miniStatementsMainErrorHandler(err, 'miniStatementDetailsErr');
    }
  });

}

