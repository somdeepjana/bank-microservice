import { AfterViewInit, Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';
declare function load_accounts(): any;

//declare const load_accounts: any;
declare var checkBalanceComponent: any;

@Component({
  selector: 'app-checkbalancemain',
  templateUrl: './checkbalancemain.component.html',
  styleUrls: ['./checkbalancemain.component.scss']
})
export class CheckbalancemainComponent implements OnInit, AfterViewInit{

  constructor(
    private router:Router
  )
    {
      //checkBalanceComponent = this;
      //load_accounts();
      this.initVariable();
    }

  initVariable(){
    checkBalanceComponent = this;
  }

  display_details(pageName: String, id: String){
    console.log(id);
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void{
  }

  ngAfterViewInit(): void{
    //load_accounts();
  }

  ngOnDestroy(){
    checkBalanceComponent = null;
  }
}
