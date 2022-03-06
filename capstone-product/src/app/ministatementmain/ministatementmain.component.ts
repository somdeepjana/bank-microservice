import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendServicesService } from '../backend-services.service';

declare var miniStatementComponent: any;
@Component({
  selector: 'app-ministatementmain',
  templateUrl: './ministatementmain.component.html',
  styleUrls: ['./ministatementmain.component.scss']
})
export class MinistatementmainComponent implements OnInit {

  constructor(private router:Router, private backendService: BackendServicesService) {
    //miniStatementComponent = this;
    this.initVariable();
    setTimeout(() => {this.backendService.load_mini_accounts()}, 200);
  }

  initVariable(){
    miniStatementComponent = this;
  }

  goToDetailsPage(pageName: String, id: String){
    console.log(id);
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
    let auth = (window as { [key: string]: any })["user_loggedin"] as string;
    if (!auth){
      this.router.navigate(['/']);
    }
    miniStatementComponent = this;
  }

  ngOnDestroy(): void{
    miniStatementComponent = null;
  }

}
