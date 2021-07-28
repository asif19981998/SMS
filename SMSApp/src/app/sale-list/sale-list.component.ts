import { Component, OnInit } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import { Saledetails } from '../saledetails';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {
  saleList:Saledetails[];
  constructor(private service:StockManageServiceService) { }

  ngOnInit() {
    // this.service.getSaleDetail().then(res=>this.saleList=res as Saledetails[])
  }

}
