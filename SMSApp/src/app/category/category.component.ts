import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, NgForm} from '@angular/forms'
import { StockManageServiceService } from '../stock-manage-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { ProductComponent } from '../product/product.component';
import { Category } from '../category';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
 
  constructor(
    private _stockManageService:StockManageServiceService,
    private dialogRef:MatDialogRef<CategoryComponent>,) { }

  ngOnInit() {
    this.resetForm();
   
    
  }
  resetForm(form?:NgForm){
    if(form !=null){
      form.form.reset();
    }
    this._stockManageService.categoryFormData={
      Id:0,
      Code:'',
      Name:''
    }
  }

  onSubmit(categoryform:NgForm){
    this.dialogRef.close(); 
    if(this._stockManageService.categoryFormData.Id==0){
      this.insertRecord(categoryform)
     
    }
    else{
      this.updateRecord(categoryform)
     
    }

  }
  insertRecord(categoryform:NgForm){
    if(categoryform!=null){
      this._stockManageService.postCategory()
      .subscribe(result=>{
        this.resetForm(categoryform);
       
        this._stockManageService.categoryRefreshList(); 
        
      })
    }
   
  }
  updateRecord(categoryform:NgForm){
    if(categoryform !=null){
      this._stockManageService.putCategory()
    .subscribe(result=>{
      this.resetForm(categoryform);
      
      this._stockManageService.categoryRefreshList();
      
    })
    }
    
  }
  CloseDropDown(){
    this.dialogRef.close(); 
  }

 
  

}
