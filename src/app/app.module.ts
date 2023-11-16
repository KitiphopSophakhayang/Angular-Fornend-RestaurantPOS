import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageUserComponent } from './page-user/page-user.component';
import { PageUserBuyComponent } from './page-user-buy/page-user-buy.component';

@NgModule({
  declarations: [
    AppComponent,
    PageUserComponent,
    PageUserBuyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
