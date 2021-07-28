import { Component, OnInit } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import { Product } from '../product';
import { PurchaseDetails } from '../purchase-details';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  purchase:PurchaseDetails[];
  constructor(private service:StockManageServiceService) { }

  ngOnInit() {
    // this.service.getAllProductFromPurchase().then(res=>this.purchase=res as PurchaseDetails[]);

  }

}
