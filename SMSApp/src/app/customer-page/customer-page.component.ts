import { Component, OnInit } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import {ToasterService } from 'angular2-toaster';
import { Customer } from '../customer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {
  itemsPerPage:number;
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
 showEditTb=false;
 showInuput=false;
 showListMode=false;
customer:Customer[];
rowNumber:Number;
constructor(private _stockManageService:StockManageServiceService,
  private toastr:ToasterService,) {
   
   }

ngOnInit() {
  this._stockManageService.customerRefreshList();
  this._stockManageService.customerList;
  this.resetFrom();
  this._stockManageService.getAllCustomer().then(res=>this.customer =res as Customer[]);
  this.itemsPerPage=10;
  
  
 
  // this.arrayValue = Array(5).fill(0).map((x,i)=>i+1); 
}


resetFrom(form?:NgForm){
  this._stockManageService.customerFormData={
    Id:0,
    Code:"",
    Name:"",
    Address:"",
    Email:"",
    Contact:"",
    LoyalityPoint:""

  }
}
onSubmit(customerForm:NgForm){
  this._stockManageService.customerPost()
  .subscribe(res=>{
    if(res==null){
      alert("Already Exits");
    }
     this.resetFrom(customerForm);
     alert("Save Successfully")
     this._stockManageService.customerRefreshList();
  });
}

afterClickSrcButton(){
  this.showListMode=false;
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
  this.showInuput=false;
  
  
  
}
afterClickCrtButton(){
  this.showListMode=false;
  this.showCrtForm=true;
  this.showSrcForm=false;
  this.showSrcHeader=false;
  this.showListHeader=false;
  this.showCrtHeader=true;
  this.showCrtButton=false;
  this.showListButton=true;
  this.showSrcButton=true;
  this.showSrcAdvance=false;
  this.showListTb=true;
  this.showSrcTb=false;
  this.showInuput=false;
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
  this.showInuput=false;
  this.showListMode=false;
}
afterClickAdbtn(){
  
  this.showSrcAdvance=true;
  this.showSrcBox=false;
  
}
afterClickSrcBtn(){
  this.showListTb=false;
  this.showSrcTb=true;
}
srCustomer(form):any{
  this._stockManageService.srCustomer(form);
}

hideSuccessMsg(){
  this.successMsg=false;
}

onDelete(Id){
  if(confirm("Are you sure to delete this element")){
    this._stockManageService.deleteCustomer(Id)
    .subscribe(e=>
      this._stockManageService.customerRefreshList())
  }
}
edit(val){
  
  this.showInuput=true;
  this.showListMode=false;
 

}
updateCustomer(id,code,name,address,email,contact,loyalityPoint){
  this.showInuput=false;
  this.rowNumber !==id;
  let cus={
    id,
    code,
    name,
    address,
    email,
    contact,
    loyalityPoint
  }
 this._stockManageService.putCustomer(cus)
 .subscribe(res=>{
  this._stockManageService.customerRefreshList()

  

 
  
})

}
afterClEditBtn(){
  this.showListMode=false;
}  
afterClickListMode(){
  this.showListMode=false;
  this.showInuput=false;
  this.showListMode=false;
  this.showCrtButton=true;
  this.showSrcButton=true;
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




}
