import { Component, OnInit } from '@angular/core';
import {Router}from '@angular/router';
import { BackendServicesService } from '../backend-services.service';

declare var transferAmountComponent: any;
@Component({
  selector: 'app-transferamount',
  templateUrl: './transferamount.component.html',
  styleUrls: ['./transferamount.component.scss']
})
export class TransferamountComponent implements OnInit {

  constructor(private router:Router, private backendService: BackendServicesService) {
    //transferAmountComponent = this;
    this.initVariable();
    setTimeout(() => {this.backendService.transferAmountLoadAccountsService()}, 200);
   }

  initVariable(){
     transferAmountComponent = this;
   }

   transferRedirect(pagename: String){
    this.router.navigate([`${pagename}`]);
   }

  ngOnInit(): void {
    let auth = (window as { [key: string]: any })["user_loggedin"] as string;
    if (!auth){
      this.router.navigate(['/']);
    }
  }

}
