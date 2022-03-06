import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendServicesService {

  constructor() { }
  /**
  * Function to display the details in balance page
  */
  public displayDetailsService(){
    try {
      var loadBtnEle: any;
      loadBtnEle = document.getElementById("details_balance_load_btn");
      loadBtnEle.click();
    }
    catch {
      console.log("[ERROR]: IGNORED FROM \n \
      \t--> displayDetailsService() backeend service\n \
      \t==> from hecck balance detailes page \
      \t==> For btn click load")
    }

  }

  /**
   * Function to display the transfer status in transfer page
   */
  public displayTransferDataService(){

    try{
      var loadBtnEle: any;
      loadBtnEle = document.getElementById("trnsferReportLoad");
      loadBtnEle.click();
    }
    /*var loadBtnEle: any;
    loadBtnEle = document.getElementById("trnsferReportLoad");
    loadBtnEle.click();*/
    catch {
      console.log("[ERROR]: IGNORED FROM \n \
      \t--> displayTransferDataService() backeend service\n \
      \t==> from Transfer page 3 page \
      \t==> For btn click load")
    }

  }

  /**
   * Function to display the transfer amount data
   */
  public transferAmountLoadAccountsService(){

    try{
      var loadBtnEle: any;
      loadBtnEle = document.getElementById("transferLoadbtn");
      loadBtnEle.click();
    }
    catch {
      console.log("[ERROR]: IGNORED FROM \n \
      \t--> transferAmountLoadAccountsService() backeend service\n")
    }


  }

  /**
   * Function to display the ministatements details
   */
  public load_mini_accounts(){

    // var loadBtnEle: any;
    // loadBtnEle = document.getElementById("mini_load_btn");
    // loadBtnEle.click();
    try{
      var loadBtnEle: any;
    loadBtnEle = document.getElementById("mini_load_btn");
    loadBtnEle.click();
    }
    catch{
      console.log("[ERROR]: IGNORED FROM \n \
    \t--> load_mini_accounts() backeend service\n")}
  }
  /**
   * Function to trigger click event
   */
  public load_miniStatements(){

   /* var mini_stmt_ld: any;
        mini_stmt_ld = document.getElementById('ministatementLoadBtn');
        mini_stmt_ld.click();*/
        try{
          var mini_stmt_ld: any;
        mini_stmt_ld = document.getElementById('ministatementLoadBtn');
        mini_stmt_ld.click();
        }
        catch{
          console.log("[ERROR]: IGNORED FROM \n \
        \t--> load_miniStatements() backeend service\n")}
  }
  /**
   * Function to load the currency values
   */
  public load_curreny_values_for_transfer(){
    // var load_transfer_btn: any;
    // load_transfer_btn = document.getElementById("transferamountloadbtn");
    // load_transfer_btn?.click()

    try{
      var load_transfer_btn: any;
    load_transfer_btn = document.getElementById("transferamountloadbtn");
    load_transfer_btn?.click()
    }
    catch{
      console.log("[ERROR]: IGNORED FROM \n \
    \t--> transferAmountLoadAccountsService() backeend service\n")}
  }

}
