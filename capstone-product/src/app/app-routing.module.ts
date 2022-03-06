import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckbalancemainComponent } from './checkbalancemain/checkbalancemain.component';
import { TransferamountComponent } from './transferamount/transferamount.component';
import { MinistatementmainComponent } from './ministatementmain/ministatementmain.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'checkbalancemain', component: CheckbalancemainComponent},
  {path:'transferamount', component: TransferamountComponent},
  {path:'ministatementmain', component: MinistatementmainComponent},
  {path: 'main', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
