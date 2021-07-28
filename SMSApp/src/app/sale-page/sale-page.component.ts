import { Component, OnInit } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import { Sales } from '../sales';
import { Customer } from '../customer';
import { Saledetails } from '../saledetails';
import { NgForm } from '@angular/forms';
import { HttpXsrfInterceptor } from '@angular/common/http/src/xsrf';

@Component({
  selector: 'app-sale-page',
  templateUrl: './sale-page.component.html',
  styleUrls: ['./sale-page.component.css']
})
export class SalePageComponent implements OnInit {
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
  constructor(private _stockManageService:StockManageServiceService) { }
  salesList:Sales[];
  customerList:Customer[];
  srcSaleList:Sales[];
  saleDetails:Saledetails[];
  itemPage:number;
  ngOnInit() {
    this.resetFrom();
    this._stockManageService.getAllCustomer().then(res=>this.customerList=res as Customer[]);
    this.updateTotal();
   this._stockManageService.getSaleDetail();
    this.itemPage=5;

  }
  resetFrom(){
    this._stockManageService.salesFormData={
      
      SaleId:0,
      CustomerId:"",
      CustomerName:"",
      Date:null,
      LoyalityPoint:"",
      GrandTotal:0,
      Due:0,
      Paid:0,
    }
    this._stockManageService.salesDetails=[];
  }
  onSubmit(form:NgForm){
    this._stockManageService.saveSales().subscribe(res=>this.resetFrom());
    alert("Save Successfully")
    form.reset();
   
   // this.service.salesDetails=[];
   this._stockManageService.saleRefreshList();

  }
  updateTotal(){
    this._stockManageService.salesFormData.GrandTotal=this._stockManageService.salesDetails.reduce((pre,curr)=>{
      return pre+(curr.Quantity*curr.UnitPrice);
    },0)
    this._stockManageService.salesFormData.GrandTotal=parseFloat(this._stockManageService.salesFormData.GrandTotal.toFixed(2))
  }
  updatedue(){
    this._stockManageService.salesFormData.Due=(this._stockManageService.salesFormData.GrandTotal-this._stockManageService.salesFormData.Paid)
    this._stockManageService.salesFormData.Due=parseFloat(this._stockManageService.salesFormData.Due.toFixed(2)) 
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
  addCId(control){
    this._stockManageService.salesFormData.CustomerId=this.customerList[control.selectedIndex-1].Code;
  }
  srcSales(val){
    this._stockManageService.srcSales(val)
    .subscribe(res=>this.srcSaleList=res as Sales[]);
  }
  afterClSaveBtn(){
    this.showSaleDts=false;
  }
  aftClDetialsBtn(Id){
    this._stockManageService.getSaleBySaleId(Id)
    .subscribe(res=>this.saleDetails=res as Saledetails[]);
    this.saleDetailsTb=true;
    
  }
  aftClDeleteBtn(id){
    if(confirm("Are you Confirm")){
      this._stockManageService.deleteSale(id)
    .subscribe(res=>alert(res));
    }
    

  }

}
