import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendServicesService } from '../backend-services.service';

@Component({
  selector: 'app-transactipon-page2',
  templateUrl: './transactipon-page2.component.html',
  styleUrls: ['./transactipon-page2.component.scss']
})
export class TransactiponPage2Component implements OnInit {

  constructor(private router: Router, backEndServices: BackendServicesService) {
    //backEndServices.load_curreny_values_for_transfer();
    setTimeout(
      ()=>{backEndServices.load_curreny_values_for_transfer();},
      100
      );
   }

   backToTransferMain(pageName:string): void{
     this.router.navigate([`${pageName}`]);
   }
  ngOnInit(): void {
  }

}
