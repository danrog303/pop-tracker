import {Component, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import SubcategoryType from "../../../models/subcategory-type.enum";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class SubcategoryComponent {
  @Input() subcategoryName: string = "";
  @Input() subcategoryId: string = "";
  @Input() subcategoryType: SubcategoryType = SubcategoryType.BOOK;

  constructor(private router: Router) {}
}
