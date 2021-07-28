import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { StockManageServiceService } from './stock-manage-service.service';
import { ToasterModule,ToasterService } from 'angular2-toaster';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatCardModule,MatDialogModule,MatToolbarModule,MatIconModule} from '@angular/material';
import { SupplierComponent } from './supplier/supplier.component';
// import { CustomerComponent } from './customer/customer.component';
import { ReadFile } from './read-file';
import { RouterModule } from '@angular/router';
import { PurchaseComponent } from './purchase/purchase.component';
import { OrderComponent } from './order/order.component';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';
import { SalesComponent } from './sales/sales.component';
import { SaledetalisComponent } from './saledetalis/saledetalis.component';
import { StockComponent } from './stock/stock.component';
import { StockPipe } from './stock.pipe';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LogInComponent } from './log-in/log-in.component';
import { CustomerPipePipe } from './customer-pipe.pipe';
import { SalesPipe } from './sales.pipe';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryListPipe } from './category-list.pipe';
import { SaleListComponent } from './sale-list/sale-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatInputModule} from '@angular/material/input';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { SalePageComponent } from './sale-page/sale-page.component';
import { SupplierPipe } from './supplier.pipe';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductPipe } from './product.pipe';
import { PurchasePipe } from './purchase.pipe';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryDetailsComponent,
    ProductComponent,
    ProductDetailsComponent,
    SupplierComponent,
    // CustomerComponent,
    PurchaseComponent,
    OrderComponent,
    PurchaseDetailsComponent,
    SalesComponent,
    SaledetalisComponent,
    StockComponent,
    StockPipe,
    HomeComponent,
    ContactComponent,
    LogInComponent,
    CustomerPipePipe,
    SalesPipe,
    CategoryListComponent,
    CategoryListPipe,
    SaleListComponent,
    CustomerPageComponent,
    SalePageComponent,
    SupplierPipe,
    ProductPageComponent,
    ProductPipe,
    PurchasePipe,

  ],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    NgxPaginationModule,
    ReactiveFormsModule, ToasterModule.forRoot(), HttpClientModule, BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'Product', component: ProductComponent},
      // {path:'Customer',component:CustomerComponent},
      {path: 'Supplier', component: SupplierComponent},
      {path:'Purchase', component: PurchaseComponent},
      // {path:'Sales',component:SalesComponent},
      {path: 'Stock', component: StockComponent},
      {
        path: 'Home',
        component: HomeComponent
      },
      {path: 'Contact', component: ContactComponent},
      {path: 'LogIn', component: LogInComponent},
      // {path:'Category',component:CategoryListComponent},
      // {path:'Sale',component:SaleListComponent},
      {path: 'CustomerPage', component: CustomerPageComponent},
      {path: 'SaleReport', component: SalePageComponent},
    ]),
  ],


  
  providers: [{provide:'Service',useClass:StockManageServiceService},ReadFile,ProductComponent],
  entryComponents:[CategoryComponent,PurchaseDetailsComponent],
  bootstrap: [
    
    AppComponent
    
  ]
})
export class AppModule { }
