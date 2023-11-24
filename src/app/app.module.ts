import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageUserComponent } from './fontend-app-user/page-user/page-user.component';
import { PageUserBuyComponent } from './fontend-app-user/page-user-buy/page-user-buy.component';
import { ListMenuComponent } from './fontend-admin/list-menu/list-menu.component';
import { OrderMenuComponent } from './fontend-admin/order-menu/order-menu.component';
import { ListEditComponent } from './fontend-admin/list-edit/list-edit.component';
import { ReportComponent } from './fontend-admin/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    PageUserComponent,
    PageUserBuyComponent,
    ListMenuComponent,
    OrderMenuComponent,
    ListEditComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
