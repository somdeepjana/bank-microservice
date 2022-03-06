var val = 0;
/*
  function to load the accounts data of a particular customer
*/
function load_accounts(){
  var data = JSON.parse(atob(sessionStorage.getItem('ac_data')));
  var app_str = "<option selected value='-1'>select account number</option>";
  for (var i = 0; i < data.length; i++){
    app_str += "<option value='"+i+"'>"+data[i]['account_id']+"</option>"
  }
  document.getElementById('accountNumber').innerHTML = app_str;
  document.getElementById('dropdwn').style.display="block";
  document.getElementById('load_btn').style.display="none";
}

/*
  function to get the account balance
*/
function get_acc_balance(){
  val = document.getElementById('accountNumber').value;

  if (val.localeCompare('-1') == 0){
    alert("Please select account number");
    //$("#checkBalanceDetailsError").html("Please Select account number");
  }
  else{
    var selec_id = parseInt(val);
    checkBalanceComponent.display_details("checkbalancedetails", val);
  }
}

/**
 * Function to display the details in dom
 */
function display_details(){

  //document.getElementById('details_balance_load_btn').style.display = 'none';
  if (sessionStorage.getItem("ac_data") === null){
    var err = {errorCode: '0', message: "No data found"};
    checkBalanceDetailsErrorHandler(err);
    return;
  }
  var data = JSON.parse(atob(sessionStorage.getItem("ac_data")));
      items = [];
      for (var i = 0; i < data.length; i+=1){
        row = "<tr>";

        row += "<td>"+data[i]['account_id']+"</td>";
        row += "<td>"+data[i]['balance_amount']+"</td>";
        row += "<td>"+data[i]['limit_amount']+"</td>";
        row += "<td>"+data[i]['lien_amount']+"</td>";
        var badge_currency = "<span class='badge badge-pill badge-success'>"+data[i]['currency']+"</span>"
        row += "<td>"+badge_currency+"&nbsp;"+data[i]['effective_balance']+"</td>";

        row += "</tr>";
        items.push(row);
      }

      $('#displayBalance').find('tbody').empty();
      $('<tbody/>', {
        html: items.join('')
      }).appendTo('#displayBalance');

  document.getElementById('displayBalance').style.display='';
}
