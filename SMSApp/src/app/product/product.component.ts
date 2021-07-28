import { Component, OnInit, ReflectiveInjector } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import { NgForm } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { MatDialogRef, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { CategoryComponent } from '../category/category.component';
import { ReadFile } from '../read-file';
import { IProductImage } from '../iproduct-image';
import { Category } from '../category';
import { stringify } from '@angular/compiler/src/util';
import { Product } from '../product';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  minDate = new Date();
  maxDate = new Date(2020, 3, 10);

  MinDate = new Date(2018, 3, 10);
  MaxDate = new Date();

  rowNumber:number;
  productList:Product[];
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
  constructor(private _stockManageService:StockManageServiceService,private readFile:ReadFile,private dialog:MatDialog) { 
      // 
      // const injector:any =ReflectiveInjector.resolveAndCreate([StockManageServiceService]);
      // this._stockManageService=injector.get(StockManageServiceService);

    }

  ngOnInit() {
    this.resetForm();
    this._stockManageService.categoryRefreshList();
   
    
  this._stockManageService.productRefreshList();
    // this._stockManageService.getAllProduct().then(res=>this.productList=res as Product[])
   


  }
  
 
 
 
 
  resetForm(form?:NgForm){
    if(form !=null){
      form.form.reset();
    }
    this._stockManageService.productFormData={
      Id:0,
      Code:'',
      Name:'',
      CategoryId:'',
      ReorderLevel:0,
      CategoryName:'',
      Description:'',
      UnitPrice:0,
      ExpireDate:null,
      ManuFactureDate:null,
      ImageStr:null
    }
  }

  onSubmit(productForm:any){
    if(this._stockManageService.productFormData.Id==0){
       this.insertRecord(productForm)
       
    }

    else{
      this.updateRecord(productForm)
    }

  }
  insertRecord(productForm:NgForm){
    // productForm.value.ImageStr=this._stockManageService.productFormData.ImageStr;
    this._stockManageService.postProduct()
    .subscribe(result=>{
      this.resetForm(productForm);
      this._stockManageService.productRefreshList(); 
      alert("Save Successfully");
    })
  }
  updateRecord(product:any){
    this._stockManageService.putProduct(product)
    .subscribe(result=>{
      this.resetForm(product);
      alert("Update Successfully");
    
      this._stockManageService.productRefreshList(); 
    })
  }
  inlineUpdateRecord(product:any){
    this._stockManageService.putInlineProduct(product)
    .subscribe(result=>{
      this.resetForm(product);
     
      this._stockManageService.productRefreshList(); 
    })
  }
  categoryPopup(){
    const dataDialogConfig=new MatDialogConfig();
    dataDialogConfig.autoFocus=true;
    dataDialogConfig.disableClose=true;
    dataDialogConfig.width="100";
    
    this.dialog.open(CategoryComponent, dataDialogConfig);
 }
 fileChangeImage(event: any) {
  

  if (event.target.files && event.target.files[0]) {

    this.readFile.readImageWithResize(event.target.files[0], 250, 250, (result) => {
      let img = <IProductImage>{
        id: 0,
        image: result,
        createdOn: new Date()
      };
      
      this._stockManageService.productFormData.ImageStr= img.image;
    });
     
      
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
    this.showListTb=true;
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
  srProduct(form):any{
    this._stockManageService.srProduct(form);
  }
  
  hideSuccessMsg(){
    this.successMsg=false;
  }
  
  onDelete(Id){
    if(confirm("Are you sure to delete this element")){
      this._stockManageService.deleteProduct(Id)
      .subscribe(e=>
        this._stockManageService.productRefreshList())
    }
  }
  edit(val){
    
    this.showInuput=true;
    this.showListMode=true;
   
  
  }
  afterClEditBtn(){
    this.showListMode=false;
  }  
  updateproduct(id,code,name,img,categoryName,unitprice,manufactureDate,expireDate,reorderlevel,description){
    this.showInuput=false;
    this.rowNumber !==id;
    let pro={
      id,
      code,
      name,
      img,
      categoryName,
      unitprice,
      manufactureDate,
    
      expireDate,
      reorderlevel,
      description

    }
   this._stockManageService.putProduct(pro)
   .subscribe(res=>{
    this._stockManageService.productRefreshList()
  
    
  
   
    
  })

}
passCtId(control){
 this._stockManageService.productFormData.CategoryId=this._stockManageService.categoryList[control.selectedIndex-1].Code
}



}