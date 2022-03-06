import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

declare var headerCmponent: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) {
    //headerCmponent = this;
    //this.initVariable;
    this.initVariable();

  }

  initVariable(){
    headerCmponent = this;
  }

  goToPage3(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  ngOnInit(): void {
  }

}
