import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageUserComponent } from './fontend-app-user/page-user/page-user.component';
import { PageUserBuyComponent } from './fontend-app-user/page-user-buy/page-user-buy.component';
import { ListMenuComponent } from './fontend-admin/list-menu/list-menu.component';
import { OrderMenuComponent } from './fontend-admin/order-menu/order-menu.component';
import { ListEditComponent } from './fontend-admin/list-edit/list-edit.component';
import { ReportComponent } from './fontend-admin/report/report.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { ImageCropperDialogComponent } from './image-cropper-dialog/image-cropper-dialog.component';

import { ImageCropperModule } from 'ngx-image-cropper';
import { MatDialogModule } from '@angular/material/dialog';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableSelectionDialogComponent } from './table-selection-dialog/table-selection-dialog.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { FilterOrdersByTransactionIdPipe } from './filter-orders-by-transaction-id.pipe';
import { CardComponent } from './fontend-admin/report/card/card.component';
import { BarComponent } from './fontend-admin/report/bar/bar.component';
import { TopMenuComponent } from './fontend-admin/report/top-menu/top-menu.component';
import { OrderMenuSuccessComponent } from './fontend-admin/order-menu-success/order-menu-success.component';
import { StatusPipePipe } from './pipe/status-pipe.pipe';

export const MAT_MDC_DIALOG_DATA = new InjectionToken<any>('MatMdcDialogData');


@NgModule({
  declarations: [
    AppComponent,
    PageUserComponent,
    PageUserBuyComponent,
    ListMenuComponent,
    OrderMenuComponent,
    ListEditComponent,
    ReportComponent,
    FilterPipe,
    ImageCropperDialogComponent,
    TableSelectionDialogComponent,
    ReceiptComponent,
    FilterOrdersByTransactionIdPipe,
    CardComponent,
    BarComponent,
    TopMenuComponent,
    OrderMenuSuccessComponent,
    StatusPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ImageCropperModule,
    MatDialogModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [MatDialogModule, { provide: MAT_MDC_DIALOG_DATA, useValue: {} }],
  bootstrap: [AppComponent],
})
export class AppModule {}
