import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sales'
})
export class SalesPipe implements PipeTransform {

 
  transform(saleList: any,search:any):any{
    if(search==null){
      return saleList;
    }
    else{
      return saleList.filter(function(saleList){
        let data= (saleList.CustomerName+saleList.Date+saleList.LoyalityPoint+saleList.GrandTotal+saleList.Paid+saleList.Due).toLowerCase().indexOf(search.toLowerCase())>-1
        return data;
      })
    }
//     if(data_1 != null || data_2!= null || data_3!= null || data_4!= null  ){
//      if(data_1 != null && data_1 != "")
//      {
//        return saleList.filter(function(saleList){
//         return ( saleList.Name+saleList.Quantity+saleList.UnitPrice).toLowerCase().indexOf(data_1 .toLowerCase())>-1;
//        })
//      }
//      // if(data_2 != null && data_1== null){
//      //  return customer.filter(function(customer){
//      //     return  customer.Address.indexOf(data_2)>-1;
//      //  })
//      //  }
//      if (data_2 != null && data_2!= "" ){
//       let filter=saleList.filter(c=>c.Name.toLowerCase()==data_2.toLowerCase());
//       return filter;
//      }
//   if (data_3 != null && data_3 != "" ){
    
//     let filter=saleList.filter(c=>c.Quantity==data_3)
//     return filter;
// }
// if (data_4 != null && data_4 != "" ){
//   let filter=saleList.filter(c=>c.UnitPrice==data_4)
//   return filter;
// }


//  return saleList
//     }
    
//  else{
//    return saleList
//  }
  
    }
}
