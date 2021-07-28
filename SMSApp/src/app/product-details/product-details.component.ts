import { Component, OnInit } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../product';
import { HttpClient } from '@angular/common/http';
import { ProductComponent } from '../product/product.component';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  readonly urlAddress="http://localhost:8868/api"
  editField:string;
  data:any;
  editRowID:Number;
  constructor(private _stockManageService:StockManageServiceService,
    private toastr:ToastrService,private http:HttpClient,private ProductComponent:ProductComponent) { 
   
    }

  ngOnInit() {
    this._stockManageService.productRefreshList();
    this._stockManageService.productList;
  }
  populateForm(cd:Product) {
    
     this._stockManageService.productFormData = Object.assign({},cd);
     
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this._stockManageService.deleteProduct(Id)
        .subscribe(res => {
          debugger;
          // this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Payment Detail Register');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }
  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
  updateList(id: number, property: string,ImageStr:string,CategoryId:number,UnitPrice:number,ExpireDate:string,ManuFactureDate:string,ReorderLevel:number,Description:string, event: any) {
    // const editField = event.target.textContent;
    // this._stockManageService.postProduct[id][property] = editField;
    this.editField = event.target.textContent;
    this.data=this.editField;
    let p={
      property,ImageStr,CategoryId,UnitPrice,ExpireDate,ManuFactureDate,ReorderLevel,Description
    }
    return this.http.put(this.urlAddress +'/Categories/'+id,p)
    .subscribe(result=>{
      console.log("result")
    })
  }
  UpdateProduct(Id:number,Code:number,Name:String,ImageStr:String,CategoryId:number,
    UnitPrice:number,ExpireDate:Date,ManuFactureDate:Date,ReorderLevel:number,Description:string){
    let productData={
      Id,
      Code,
      Name,
      ImageStr,
      CategoryId,
      UnitPrice,
      ExpireDate,
      ManuFactureDate,
      ReorderLevel,
      Description

    }
    this.ProductComponent.inlineUpdateRecord(productData);
    console.log(productData);
    
}
  Edit(val){
    this.editRowID=val;

  }
 


}
