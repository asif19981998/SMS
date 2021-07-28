import { Injectable } from '@angular/core';
import { Category } from './category';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Product } from './product';
import { Supplier } from './supplier';
import { Subscriber } from 'rxjs';
import { Customer } from './customer';
import { PurchaseComponent } from './purchase/purchase.component';
import { Purchase } from './purchase';
import { PurchaseDetails } from './purchase-details';
import { Sales } from './sales';
import { Saledetails } from './saledetails';

@Injectable({
  providedIn: 'root'
})
export class StockManageServiceService {
  categoryFormData:Category;
  productFormData:Product;
  supplierFormData:Supplier;
  customerFormData:Customer;
  purchaseFormData:Purchase;
  salesFormData:Sales;
  saleDetailsFormData:Saledetails;
  
  categoryList:Category[]=[];
  productList:Product[]=[];
  supplierList:Supplier[]=[];
  customerList:Customer[]=[];
  srCustomerList:Customer[];
  srSupplierList:Supplier[];
  srProductList:Product[];
  productDetils:PurchaseDetails[];
  salesDetails:Saledetails[];
  purchaseList:Purchase[];
  saleList:Sales[];
   srcPurchaseList:Purchase[];
  readonly urlAddress="http://localhost:5000/api"
 
  constructor(private http:HttpClient) { }


  postCategory(){
   
  return  this.http.post(this.urlAddress +'/Categories',this.categoryFormData)
  }
  putCategory(){
   
    return  this.http.put(this.urlAddress +'/Categories/'+this.categoryFormData.Id,this.categoryFormData)
    }
  deleteCategory(Id){
      return  this.http.delete(this.urlAddress +'/Categories/' + Id)
    }
  categoryRefreshList(){
    this.http.get(this.urlAddress +'/Categories')
    .subscribe(result=> this.categoryList =result as Category[])
  }
  // get getAllCategory(){
  //   return this._categoryList
  // }
  getAllCategory(){
   return this.http.get(this.urlAddress +'/Categories').toPromise();

  }

  postProduct(){
   return  this.http.post(this.urlAddress +'/Products',this.productFormData)
    }
    putInlineProduct(product){
      return  this.http.put(this.urlAddress +'/Products/'+product.Id,product)
      }
   putProduct(val){
        return  this.http.put(this.urlAddress +'/Products/'+val.id,val)
        }
  deleteProduct(Id){
        return  this.http.delete(this.urlAddress +'/Products/' + Id)
      }
  productRefreshList(){
        this.http.get(this.urlAddress+'/Products')
        .subscribe(res=>this.productList=res as Product[])
      }

  getAllProductFromStocks(){
    return this.http.get(this.urlAddress+'/Stocks').toPromise();
  }
   supplierPost(){
   return this.http.post(this.urlAddress+'/Suppliers',this.supplierFormData)
  }
  supplierRefreshList(){
    this.http.get(this.urlAddress+'/Suppliers')
    .subscribe(res=>this.supplierList=res as Supplier[])
  }
  getAllSupplier(){
    return this.http.get(this.urlAddress+'/Suppliers').toPromise();
  }
  deleteSupplier(id){
    return this.http.delete(this.urlAddress+'/Suppliers/'+id);
  }
 
  customerPost(){
    return this.http.post(this.urlAddress+'/Customers',this.customerFormData)
  }
  customerRefreshList(){
    this.http.get(this.urlAddress+'/Customers')
    .subscribe(res=>this.customerList=res as Customer[])
  }
  getAllCustomer(){
    return this.http.get(this.urlAddress+'/Customers').toPromise();
  }
  getPurchaseDetial(){
    this.http.get(this.urlAddress+'/PurchaseDetails')
    .subscribe(e=>this.productDetils=e as PurchaseDetails[])
  }
  savePurchase(){
    var data={
      ...this.purchaseFormData,
      PurchaseDetails:this.productDetils,
    }
   return this.http.post(this.urlAddress+'/Purchases',data)
  
  }
  refreshPurchaseList(){
    this.http.get(this.urlAddress+'/Purchases')
    .subscribe(e=>this.purchaseList=e as Purchase[])
  }
  getAllProductFromPurchase(){
    return this.http.get(this.urlAddress+'/PurchaseDetails')
    .subscribe(res=>this.purchaseList=res as Purchase[]);
  }
  saveSales(){
    var data={
      ...this.salesFormData,
      SaleDetails:this.salesDetails,
    }
    return this.http.post(this.urlAddress+'/Sales',data);
  }
  saleRefreshList(){
    this.http.get(this.urlAddress+'/SaleDetails')
    .subscribe(e=>this.saleList=e as Sales[]);
  }
  getSaleDetail(){
    return this.http.get(this.urlAddress+'/Sales')
    .subscribe(e=>this.saleList=e as Sales[]);
  }
 srCustomer(vm:any){
  
    
  return this.http.post(this.urlAddress+'/Customers/Search',vm.value)
  .subscribe(e=>this.srCustomerList=e as Customer[]);
 }
 deleteCustomer(Id){
   return this.http.delete(this.urlAddress+'/Customers/'+Id)
 }
 putCustomer(val){
  return this.http.put(this.urlAddress+'/Customers/'+val.id,val)
 }
 srcSales(val){
   return this.http.post(this.urlAddress+'/Sales/SearchSale',val.value);
 }
 getSaleBySaleId(id){
  return this.http.get(this.urlAddress+'/SaleDetails/'+id)
 }
 getSaleByPurchaseId(id){
  return this.http.get(this.urlAddress+'/PurchaseDetails/'+id)
 }
 deleteSale(id){
  return  this.http.delete(this.urlAddress+'/PurchaseDetails/'+id)
 }
 deletePurchase(id){
  return  this.http.delete(this.urlAddress+'/Purchases/'+id)
 }
 srSupplier(vm){
  return this.http.post(this.urlAddress+'/Suppliers/SearchSpl',vm.value)
  .subscribe(e=>this.srSupplierList=e as Supplier[]);
 }
 srProduct(vm){
  return this.http.post(this.urlAddress+'/Products/PrdSearch',vm.value)
  .subscribe(e=>this.srProductList=e as Product[]);
 }
 srcPurchase(val){
  return this.http.post(this.urlAddress+'/Purchases/SearchPurchase',val.value)
  .subscribe(e=>this.srcPurchaseList=e as Purchase[]);
}
 

 
}

// class CustomerSearchVm{

// id=0;
// code="";
// address="Dhaka";
// name="ABC";
// contact="012112";
// email="adasd@mail.com";



// }