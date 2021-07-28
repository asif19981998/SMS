import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'purchase'
})
export class PurchasePipe implements PipeTransform {

  transform(purchaseList: any,search:any):any{
    if(search==null){
      return purchaseList;
    }
    else{
      return purchaseList.filter(function(purchaseList){
        let data= (purchaseList.InvoiceNo+purchaseList.SupplierName+purchaseList.Date+purchaseList.GrandTotal).toLowerCase().indexOf(search.toLowerCase())>-1
        return data;
      })
    }


    }

}
