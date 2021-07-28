import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

  transform(product: any, search: any): any {
    if(search==null){
      return product;
    }
    else{
      return product.filter(function(product){
         return ( product.Name+product.CategoryName+product.UnitPrice+product.ManuFactureDate+product.ExpireDate+product.ReorderLevel).toLowerCase().indexOf(search .toLowerCase())>-1;
      })
    }
  }

}
