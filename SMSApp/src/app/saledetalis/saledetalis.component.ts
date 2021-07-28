import { Component, OnInit } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import { Product } from '../product';
import { PurchaseDetails } from '../purchase-details';
import { NgForm } from '@angular/forms';
import { SalesComponent } from '../sales/sales.component';
import { Stock } from '../stock';
import { SalePageComponent } from '../sale-page/sale-page.component';

@Component({
  selector: 'app-saledetalis',
  templateUrl: './saledetalis.component.html',
  styleUrls: ['./saledetalis.component.css']
})
export class SaledetalisComponent implements OnInit {
  productList:Stock[];
  constructor(private service:StockManageServiceService,
    private salesComponent:SalePageComponent) { }

  ngOnInit() {
    this.resetForm();
    this.service.getAllProductFromStocks().then(res=>this.productList=res as Stock[]);
    
  }
  resetForm(){
    this.service.saleDetailsFormData={
      Id:0,
      Code:null,
      AvailableQuantity:0,
      SaleId:this.service.salesFormData.SaleId,
      Quantity:0,
      UnitPrice:0,
      Name:null,
     
    }

  }
  viewAvialablequantity(control_1){
    this.service.saleDetailsFormData.AvailableQuantity=this.productList[control_1.selectedIndex-1].Quantity;
    this.service.saleDetailsFormData.UnitPrice=this.productList[control_1.selectedIndex-1].UnitPrice;
    this.service.saleDetailsFormData.Code=this.productList[control_1.selectedIndex-1].Code;

   }
   onSubmit(form:NgForm){
     
     this.service.salesDetails.push(form.value);
     this.salesComponent.updateTotal();
     this.resetForm();
    
}
showTable(){
this.salesComponent.showSaleDts=true;

}

}
