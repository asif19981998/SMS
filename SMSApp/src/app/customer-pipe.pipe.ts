import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerPipe'
})
export class CustomerPipePipe implements PipeTransform {

  transform(customer: any, data_1:string,data_2:string,data_3:string,data_4:string,data_5:string,data_6:string):any{
   if(data_1 != null || data_2!= null || data_3!= null || data_4!= null || data_5!= null || data_6!= null ){
    if(data_1 != null && data_1 != "")
    {
      return customer.filter(function(customer){
       return ( customer.Name+customer.Address+customer.Contact+customer.Code+customer.Email).toLowerCase().indexOf(data_1 .toLowerCase())>-1;
      })
    }
    // if(data_2 != null && data_1== null){
    //  return customer.filter(function(customer){
    //     return  customer.Address.indexOf(data_2)>-1;
    //  })
    //  }
    if (data_2 != null &&data_2!= "" ){
      return customer.filter(function(customer){
        return customer.Code.toLowerCase().indexOf(data_2.toLowerCase())>-1;
      });
  }
  if (data_3 != null && data_3!=  ""  ){
    return customer.filter(function(customer){
      return customer.Name.toLowerCase().indexOf(data_3.toLowerCase())>-1;
    });
}
   if (data_4 != null &&data_4!= ""){
    return customer.filter(function(customer){
      return customer.Address.toLowerCase().indexOf(data_4.toLowerCase())>-1;
    });
  }
 if (data_5 != null &&data_5!= ""){
  return customer.filter(function(customer){
    return customer.Email.toLowerCase().indexOf(data_5.toLowerCase())>-1;
  });
}
 if (data_6 != null &&data_6!= ""){
  return customer.filter(function(customer){
    return customer.Contact.toLowerCase().indexOf(data_6.toLowerCase())>-1;
  });
}
return customer
   }
   
else{
  return customer
}
 
   }
 


  }