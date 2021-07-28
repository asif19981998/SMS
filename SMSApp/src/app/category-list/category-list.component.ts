import { Component, OnInit } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryList:Category[];
  constructor(private service:StockManageServiceService) { }

  ngOnInit() {
    this.service.categoryRefreshList();
    this.service.customerList;
    this.service.getAllCategory().then(res=>this.categoryList=res as Category[]);
  }

}
