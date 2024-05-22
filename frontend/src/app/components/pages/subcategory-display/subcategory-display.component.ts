import {Component, OnInit} from '@angular/core';
import Subcategory from "../../../models/subcategory.model";
import {SubcategoryService} from "../../../services/subcategory.service";
import {CommonModule} from "@angular/common";
import {ErrorAlertComponent} from "../../common/error-alert/error-alert.component";
import {SpinnerComponent} from "../../common/spinner/spinner";
import {SubcategoryComponent} from "../subcategory/subcategory.component";
import {SubcategoryEditComponent} from "../subcategory-edit/subcategory-edit.component";

@Component({
  selector: 'app-subcategory-display',
  templateUrl: './subcategory-display.component.html',
  standalone: true,
  imports: [CommonModule, ErrorAlertComponent, SpinnerComponent, SubcategoryComponent, SubcategoryEditComponent]
})
export class SubcategoryDisplayComponent implements OnInit {
  loading = true;
  error = false;
  subcategoryCreating = false;
  subcategories: Subcategory[] = [];

  constructor(private shelfService: SubcategoryService) {}

  ngOnInit(): void {
    this.fetchSubcategories();
  }


  onSubcategoryCreate() {
    this.subcategoryCreating = true;
  }

  fetchSubcategories() {
    this.error = false;
    this.shelfService.getUserShelves().subscribe({
      next: subcategoryData => {
        this.subcategories = subcategoryData;
        this.loading = false;
      }, error: errorData => {
        console.log(errorData);
        this.loading = false;
        this.error = true;
      }
    });
  }
}
