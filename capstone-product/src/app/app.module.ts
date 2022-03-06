import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { CheckbalancemainComponent } from './checkbalancemain/checkbalancemain.component';
import { CheckbalancedetailsComponent } from './checkbalancedetails/checkbalancedetails.component';
import { TransferamountComponent } from './transferamount/transferamount.component';
import { TransferamountdetailsComponent } from './transferamountdetails/transferamountdetails.component';
import { MinistatementmainComponent } from './ministatementmain/ministatementmain.component';
import { MinistatementdetailsComponent } from './ministatementdetails/ministatementdetails.component';
import { AuthComponent } from './auth/auth.component';
import { TransactiponPage2Component } from './transactipon-page2/transactipon-page2.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    CheckbalancemainComponent,
    CheckbalancedetailsComponent,
    TransferamountComponent,
    TransferamountdetailsComponent,
    MinistatementmainComponent,
    MinistatementdetailsComponent,
    AuthComponent,
    TransactiponPage2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: 'header', component: HeaderComponent},
      {path: 'main', component: MainComponent},
      {path: 'checkbalancedetails', component: CheckbalancedetailsComponent},
      {path: 'checkbalancemain', component: CheckbalancemainComponent},
      {path: 'ministatementmain', component: MinistatementmainComponent},
      {path: 'ministatementdetails', component: MinistatementdetailsComponent},
      {path: 'transferamount', component:TransferamountComponent},
      {path: 'transferamountdetails', component: TransferamountdetailsComponent},
      {path: 'transactipon-page2', component: TransactiponPage2Component}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
