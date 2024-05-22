import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import Subcategory from "../../../models/subcategory.model";
import {SubcategoryService} from "../../../services/subcategory.service";
import {SpinnerComponent} from "../../common/spinner/spinner";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-subcategory-delete',
    templateUrl: './subcategory-delete.component.html',
    imports: [
        SpinnerComponent,
        NgIf
    ],
    standalone: true
})
export class SubcategoryDeleteComponent {
    deleting = false;
    @Input() subcategoryToDelete: Subcategory | null = null;
    @Output() close = new EventEmitter<void>();

    constructor(private subcategoryService: SubcategoryService, private router: Router) {}

    onDeleteSubcategory() {
        if (this.subcategoryToDelete === null) {
            return;
        }

        this.deleting = true;
        this.subcategoryService.deleteSubcategory(this.subcategoryToDelete).subscribe(() => {
            this.close.emit();
            this.router.navigate(['/subcategories']).then();
        });
    }

    onCancel() {
        this.close.emit();
    }
}
