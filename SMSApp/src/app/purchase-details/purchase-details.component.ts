import { Component, OnInit, Inject } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import { Product } from '../product';
import { PurchaseDetails } from '../purchase-details';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseComponent } from '../purchase/purchase.component';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})
export class PurchaseDetailsComponent implements OnInit {
  showSrcForm=false;
  showCrtForm=false;
  showListHeader=true;
  showCrtHeader=false;
  showSrcHeader=false;
  showListButton=false;
  showSrcButton=true;
  showCrtButton=true;
  showSrcBox=false;
  showSrcAdvance=false;
  showUSrcBtn=true;
  showSrcTb=false;
  showListTb=true;
  successMsg=false;
  showSaleDts=false;
  saleDetailsTb=false;
  productList:Product[];
  formData:PurchaseDetails;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private service:StockManageServiceService,private matdialog:MatDialogRef<PurchaseDetailsComponent>) { }

  ngOnInit() {
    this.resetForm();
   this.service.productRefreshList();
  }
  resetForm(){
    this.formData={
      Id:0,
      Name:"",
      Code:"",
      PurchaseId:this.data?(this.data.PurchaseId>0?this.data.PurchaseId:0):0,
      ManuFactureDate:null,
      ExpireDate:null,
      PurchaseQuantity:0,
      UnitPrice:0,
      TotalPrice:0,
      NewCostPrice:0,
      NewMRP:0,
      
    }
  }
  onSubmit(formData:NgForm){
    this.service.productDetils.push(formData.value);
    //this.purchase.updateTotal();
    this.matdialog.close();
  }
  updateCodeAndPrice(control_1){
    this.formData.Code=this.service.productList[control_1.selectedIndex-1].Code;
    this.formData.UnitPrice=this.service.productList[control_1.selectedIndex-1].UnitPrice;
    this.formData.ManuFactureDate=this.service.productList[control_1.selectedIndex-1].ManuFactureDate;
    this.formData.ExpireDate=this.service.productList[control_1.selectedIndex-1].ExpireDate;


  }
  UpdatePrice(){
    this.formData.TotalPrice=parseFloat((this.formData.UnitPrice*this.formData.PurchaseQuantity).toFixed(2));
  }
  afterClickSrcButton(){
    this.showSrcForm=true;
    this.showCrtForm=false;
    this.showSrcHeader=true;
    this.showListHeader=false;
    this.showCrtHeader=false;
    this.showListButton=true;
    this.showSrcButton=false;
    this.showCrtButton=true;
    this.showSrcBox=true;
    this.showSrcAdvance=false;
    this.showListTb=true;
    this.showSrcTb=false;
    this.saleDetailsTb=false;
    
    
  }
  afterClickCrtButton(){
    this.showCrtForm=true;
    this.showSrcForm=false;
    this.showSrcHeader=false;
    this.showListHeader=false;
    this.showCrtHeader=true;
    this.showCrtButton=false;
    this.showListButton=true;
    this.showSrcButton=true;
    this.showSrcAdvance=false;
    this.showListTb=false;
    this.showSrcTb=false;
    this.saleDetailsTb=false;
  }
  afterClickListButton(){
    this.showSrcHeader=false;
    this.showListHeader=true;
    this.showCrtHeader=false;
    this.showCrtButton=true;
    this.showSrcButton=true;
    this.showListButton=false;
    this.showCrtForm=false;
    this.showSrcForm=false;
    this.showSrcAdvance=false;
    this.showListTb=true;
    this.showSrcTb=false;
  }
  afterClickAdbtn(){
    
    this.showSrcAdvance=true;
    this.showSrcBox=false;
    
  }
  afterClickSrcBtn(){
    this.showListTb=false;
    this.showSrcTb=true;
    this.saleDetailsTb=false;
    
  }

}
