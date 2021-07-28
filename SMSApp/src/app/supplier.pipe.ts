import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'supplier'
})
export class SupplierPipe implements PipeTransform {

  transform(supplierLst: any, search: any): any {
    if(search==null){
      return supplierLst;
    }
    else{
      return supplierLst.filter(function(supplierLst){
         return ( supplierLst.Name+supplierLst.Address+supplierLst.Contact+supplierLst.Code+supplierLst.Email).toLowerCase().indexOf(search .toLowerCase())>-1;
      })
    }
  }

}
