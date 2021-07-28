import { Component, OnInit } from '@angular/core';
import { StockManageServiceService } from '../stock-manage-service.service';
import { Category } from '../category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  constructor(private _stockManageService:StockManageServiceService,
    private toastr:ToastrService) { }

  ngOnInit() {
    this._stockManageService.categoryRefreshList();
  }
  populateForm(cd:Category) {
    
     this._stockManageService.categoryFormData = Object.assign({},cd);
     
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this._stockManageService.deleteCategory(Id)
        .subscribe(res => {
          debugger;
          // this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Payment Detail Register');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }


}
