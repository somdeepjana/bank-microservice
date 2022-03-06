import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { BackendServicesService } from '../backend-services.service';
@Component({
  selector: 'app-ministatementdetails',
  templateUrl: './ministatementdetails.component.html',
  styleUrls: ['./ministatementdetails.component.scss']
})
export class MinistatementdetailsComponent implements OnInit {

  constructor(private router:Router, private backendService: BackendServicesService) {
    setTimeout(() => {this.backendService.load_miniStatements()}, 200);
  }
goTopage6(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  ngOnInit(): void {
    let auth = (window as { [key: string]: any })["user_loggedin"] as string;
    if (!auth){
      this.router.navigate(['/']);
    }
  }

}
