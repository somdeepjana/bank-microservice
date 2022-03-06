import { Component, OnInit } from '@angular/core';
import {Router}from '@angular/router';
import { BackendServicesService } from '../backend-services.service';

declare var mainComponent: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router:Router, private backendService : BackendServicesService) {
    //setTimeout(() => {this.backendService.land_on_main()}, 100);
    //mainComponent = this;
    this.initVariable();
   }

   initVariable(){
    mainComponent = this;
   }

  goToPage(pageName:string, data: string):void{
    //console.log(data);
    sessionStorage.setItem("ac_data", data);
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
    let auth = (window as { [key: string]: any })["keycloakobj"] as string;
    if (!auth){
      this.router.navigate(['/']);
    }

    mainComponent = this;
  }

  ngOnDestroy(): any{
    mainComponent = null;
  }



}
