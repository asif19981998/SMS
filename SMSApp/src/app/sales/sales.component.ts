import { Component, OnInit } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import { Customer } from '../customer';
import { SaledetalisComponent } from '../saledetalis/saledetalis.component';
import { NgForm } from '@angular/forms';
import { Saledetails } from '../saledetails';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  opened=true;
advanceButton=true;
formClose=true;
customerHeader=true;
  showTable=true;
  customerList:Customer[];
  saleList:Saledetails[];
  constructor(private service:StockManageServiceService) { }

  ngOnInit() {
    this.resetFrom();
    this.service.getAllCustomer().then(res=>this.customerList=res as Customer[]);
    this.updateTotal();
    // this.service.getSaleDetail().then(res=>this.saleList=res as Saledetails[])
  }
  resetFrom(){
    this.service.salesFormData={
      
      SaleId:0,
      CustomerId:"",
      CustomerName:"",
      Date:null,
      LoyalityPoint:"",
      GrandTotal:0,
      Due:0,
      Paid:0,
    }
    this.service.salesDetails=[];
  }
  updateTotal(){
    this.service.salesFormData.GrandTotal=this.service.salesDetails.reduce((pre,curr)=>{
      return pre+(curr.Quantity*curr.UnitPrice);
    },0)
    this.service.salesFormData.GrandTotal=parseFloat(this.service.salesFormData.GrandTotal.toFixed(2))
  }
  updatedue(){
    this.service.salesFormData.Due=(this.service.salesFormData.GrandTotal-this.service.salesFormData.Paid)
    this.service.salesFormData.Due=parseFloat(this.service.salesFormData.Due.toFixed(2)) 
    }
    
  
  
  onSubmit(form:NgForm){
    this.service.saveSales().subscribe(res=>this.resetFrom());
    form.reset();
    this.showTable=true;
   // this.service.salesDetails=[];
   this.service.saleRefreshList();

  }
  open(){
    this.opened=false;
    this.advanceButton=false;
    this.formClose=false;
    this.customerHeader=false;
    
  }
  close(){
    this.opened=true;
    this.advanceButton=true;
    this.formClose=true;
    this.customerHeader=true;
  }
  addCId(control){
    this.service.salesFormData.CustomerId=this.customerList[control.selectedIndex-1].Code;
  }
  
  
 

}
