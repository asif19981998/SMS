import { Component, OnInit } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import { Supplier } from '../supplier';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { PurchaseDetailsComponent } from '../purchase-details/purchase-details.component';
import { Purchase } from '../purchase';
import { NgForm } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { PurchaseDetails } from '../purchase-details';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  supplierList:Supplier[];
  purchaseDetailList:PurchaseDetails[];
  itemsPerPage:number;
  showSrcForm=false;
  showCrtForm=true;
  showListHeader=false;
  showCrtHeader=true;
  showSrcHeader=false;
  showListButton=true;
  showSrcButton=true;
  showCrtButton=false;
  showSrcBox=false;
  showSrcAdvance=false;
  showUSrcBtn=true;
  showSrcTb=false;
  showListTb=false;
  successMsg=false;
  showEditTb=false;
  showInuput=false;
  showListMode=false;
  showPurchseTb=true;
  purchaseDtlTb=false;
 
 
  constructor(private service:StockManageServiceService,private dialog:MatDialog) { }

  ngOnInit() {
   this.resetForm();
   this.service.getAllSupplier().then(res=>this.supplierList=res as Supplier[]);
   this.service.refreshPurchaseList();
   this.service.purchaseList;
   }
   resetForm(){
     this.service.purchaseFormData={
      PurchaseId:0,
      Date:null,
      InvoiceNo:"",
      SupplierId:'',
      SupplierName:'',
      GrandTotal:0

     }
     this.service.productDetils=[];
   }
   addOrEditOrderItem(PurchaseId){
   
    const dataDialogConfig=new MatDialogConfig();
    dataDialogConfig.autoFocus=true;
    dataDialogConfig.disableClose=true;
    dataDialogConfig.width="50";
    dataDialogConfig.data={PurchaseId};

   this.dialog.open(PurchaseDetailsComponent,dataDialogConfig).afterClosed()
   .subscribe(res=>{
   this.updateTotal();
  
   });
  }
  onSubmit(PurchaseForm:NgForm){
    this.service.savePurchase().subscribe(res=>this.resetForm());
    PurchaseForm.reset();
      alert("Save Successfully");
      this.service.refreshPurchaseList();
      
      
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
    this.showListMode=false;
   
    
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
    this.showInuput=false;
    this.showListMode=false;
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
    this.showPurchseTb=false;
    
  }
  afterClickListMode(){
    this.showListMode=false;
    this.showInuput=false;
    
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
  srcPurchase(form):any{
    this.service.srcPurchase(form);
  }
  passId(control){
    this.service.purchaseFormData.SupplierId=this.supplierList[control.selectedIndex-1].Code;  
  }
  updateTotal(){
    this.service.purchaseFormData.GrandTotal=this.service.productDetils.reduce((pre,curr)=>{
      return pre+(curr.TotalPrice);
    },0)
    this.service.purchaseFormData.GrandTotal=parseFloat(this.service.salesFormData.GrandTotal.toFixed(2))
  }
  aftClDetialsBtn(Id){
    this.service.getSaleByPurchaseId(Id)
    .subscribe(res=>this.purchaseDetailList=res as PurchaseDetails[]);
    this.purchaseDtlTb=true;
    
  }
  aftClDeleteBtn(id){
    if(confirm("Are you Confirm")){
      this.service.deletePurchase(id)
    .subscribe(res=>(this.service.refreshPurchaseList()));
    }
    

  }
 
 
  }


