import { Component, OnInit } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Supplier } from '../supplier';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

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
  showInuput=false;
 supplier:Supplier[];
 rowNumber:Number;
 constructor(private _stockManageService:StockManageServiceService,
   private toastr:ToasterService,) {
    
    }
 
 ngOnInit() {
   this._stockManageService.supplierRefreshList();
   this._stockManageService.supplierList;
   this.resetFrom();
   this._stockManageService.getAllSupplier().then(res=>this.supplier =res as Supplier[]);
   this.itemsPerPage=10;
   
   
  
   // this.arrayValue = Array(5).fill(0).map((x,i)=>i+1); 
 }
 populatedForm(form:Supplier){
 
 }
 
 resetFrom(form?:NgForm){
   this._stockManageService.supplierFormData={
     Id:0,
     Code:"",
     Name:"",
     Address:"",
     Email:"",
     Contact:"",
     ContactPerson:""
 
   }
 }
 onSubmit(supplierFm:NgForm){
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
   if(supplierFm.value.Contact.length ==11 ){
    this._stockManageService.supplierPost()
    .subscribe(res=>{
      if(res==null){
        alert("Already Exits");
      }
      else{
       this.resetFrom(supplierFm);
       alert("Save Successfully")
       
      
       this._stockManageService.supplierRefreshList();
 
      }
       this.resetFrom(supplierFm);
       
       this.successMsg=true;
       this._stockManageService.supplierRefreshList();
    });
   }
   else{
     alert("Invalid Contact Number(Must be  11 Digit)")
   }
  
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
   this.showInuput=false;
   
   
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
 }
 afterClickAdbtn(){
   
   this.showSrcAdvance=true;
   this.showSrcBox=false;
   
 }
 afterClickSrcBtn(){
   this.showListTb=false;
   this.showSrcTb=true;
 }
 srSupplier(form):any{
   this._stockManageService.srSupplier(form);
 }
 
 hideSuccessMsg(){
   this.successMsg=false;
 }
 
 onDelete(Id){
   if(confirm("Are you sure to delete this element")){
     this._stockManageService.deleteSupplier(Id)
     .subscribe(e=>
       this._stockManageService.supplierRefreshList()
     )
   }
 }
 edit(val){
  this.showInuput=true;
  this.showListButton=true;
 
 }
 updateCustomer(id,code,name,address,email,contact,loyalityPoint){
  this.showInuput=false;
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
 }

}
