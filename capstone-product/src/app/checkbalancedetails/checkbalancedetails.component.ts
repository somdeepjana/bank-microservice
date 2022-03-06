import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import {Router} from '@angular/router';
//declare function display_details(): any;

import { BackendServicesService } from '../backend-services.service';

@Component({
  selector: 'app-checkbalancedetails',
  templateUrl: './checkbalancedetails.component.html',
  styleUrls: ['./checkbalancedetails.component.scss']
})

export class CheckbalancedetailsComponent implements OnInit, AfterViewChecked {


  constructor(private router: Router , private backendService : BackendServicesService) {
    //this.backendService.display_details();
    setTimeout(() => {this.backendService.displayDetailsService()}, 200);
  }

  balanceRedirect(pageName:string):void{

    this.router.navigate([`${pageName}`]);
  }


  ngOnInit(){

    let auth = (window as { [key: string]: any })["user_loggedin"] as string;
    if (!auth){
      this.router.navigate(['/']);
    }


  }

  ngAfterViewChecked(){
    //alert("View check called");
    //setTimeout(() => {this.backendService.display_details()}, 1000);
  }


}
