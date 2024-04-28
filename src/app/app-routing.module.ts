import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEditComponent } from './fontend-admin/list-edit/list-edit.component';
import { ListMenuComponent } from './fontend-admin/list-menu/list-menu.component';
import { OrderMenuComponent } from './fontend-admin/order-menu/order-menu.component';
import { ReportComponent } from './fontend-admin/report/report.component';
import { OrderMenuSuccessComponent } from './fontend-admin/order-menu-success/order-menu-success.component';
import { OrderHistoryComponent } from './fontend-admin/order-history/order-history.component';
import { PaymentHistoryComponent } from './fontend-admin/payment-history/payment-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/ListMenu', pathMatch: 'full' },
  { path: 'ListMenu', component: ListMenuComponent },
  { path: 'OrderMenu', component: OrderMenuComponent },
  { path: 'ListEdit', component: ListEditComponent },
  { path: 'Report', component: ReportComponent },
  { path: 'success', component: OrderMenuSuccessComponent },
  { path: 'history', component: OrderHistoryComponent},
  { path: 'paymenthistory', component: PaymentHistoryComponent},
  { path: '**', redirectTo: 'ListMenu' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
