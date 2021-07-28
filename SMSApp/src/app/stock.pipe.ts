import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stock'
})
export class StockPipe implements PipeTransform {

  transform(product: any, productSearch: any): any {
   if(productSearch == null )
   {
     return product
   }
   else{
     return product.filter(function(product){
      return ( product.Name+product.ReorderLevel).toLowerCase().indexOf(productSearch.toLowerCase())>-1;
     })
   }
  }

}
