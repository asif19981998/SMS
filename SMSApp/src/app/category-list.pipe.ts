import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryList'
})
export class CategoryListPipe implements PipeTransform {

  transform(categoryList: any, search: any): any {
    if(categoryList == null )
   {
     return categoryList
   }
   else{
     return categoryList.filter(function(categoryList){
      return ( categoryList.Name+categoryList.Code).toLowerCase().indexOf(search.toLowerCase())>-1;
     })
   }
  }

}
