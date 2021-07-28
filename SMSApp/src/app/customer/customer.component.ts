import { Component, OnInit, ViewChild } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ProductComponent } from '../product/product.component';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
//  search:null;
//   searchCity:null;
// p: number = 1;
itemsPerPage:number;
// arrayValue:number[];
opened=true;
advanceButton=true;
formClose=true;
customerHeader=true;
hideTable=false;
  queryField:Customer;
  customer:Customer[];
  srCustomerValue:Customer[];
  constructor(private _stockManageService:StockManageServiceService,
    private toastr:ToastrService,) {
     
     }

  ngOnInit() {
    this._stockManageService.customerRefreshList();
    this._stockManageService.customerList;
    this.resetFrom();
    this._stockManageService.getAllCustomer().then(res=>this.customer =res as Customer[]);
    this.itemsPerPage=3;
   
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
       this.resetFrom(customerForm);
       this.toastr.success('Submit Successfully');
       this._stockManageService.customerRefreshList();
    });
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
    this.hideTable=false;
  }
  // itemNumber(value){
  //   this.itemsPerPage=value.value;
  // }
srCustomer(form):any{
    this._stockManageService.srCustomer(form);
}
srButton(){
  this.hideTable=true;
}
}
