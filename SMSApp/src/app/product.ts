import { DecimalPipe } from '@angular/common';

export class Product {
    Id:number;
    Code:String;
    Name:String;
    CategoryId:string;
    CategoryName:string;
    ReorderLevel:number;
    Description:String;
    ImageStr:String;
    ExpireDate:Date;
    ManuFactureDate:Date;
    UnitPrice:number;
}
