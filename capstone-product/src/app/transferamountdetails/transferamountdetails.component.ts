import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { BackendServicesService } from '../backend-services.service';

//declare var displayTransferData: any;
@Component({
  selector: 'app-transferamountdetails',
  templateUrl: './transferamountdetails.component.html',
  styleUrls: ['./transferamountdetails.component.scss']
})
export class TransferamountdetailsComponent implements OnInit, AfterViewInit {

  constructor(private router:Router, private backendService:BackendServicesService) {
    setTimeout(() => {this.backendService.displayTransferDataService()}, 200);
  }
  goTopage4(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  ngOnInit(): void {
    let auth = (window as { [key: string]: any })["user_loggedin"] as string;
    if (!auth){
      this.router.navigate(['/']);
    }

    //displayTransferData = (window as { [key: string]: any })["displayTransferData"] as any;
  }

  ngAfterViewInit(): void{
    //displayTransferData();
  }

}
