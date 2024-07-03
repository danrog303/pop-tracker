import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormsModule, NgForm} from "@angular/forms";
import {SubcategoryService} from "../../../services/subcategory.service";
import Subcategory from "../../../models/subcategory.model";
import {NgIf} from "@angular/common";
import {SpinnerComponent} from "../../common/spinner/spinner";

@Component({
    selector: 'app-subcategory-edit',
    templateUrl: 'subcategory-edit.component.html',
    imports: [FormsModule, NgIf, SpinnerComponent],
    standalone: true
})
export class SubcategoryEditComponent implements OnInit {
    saving = false;
    error = false;
    quotaExceeded = false;
    editMode = false;
    @Input() editedSubcategory: Subcategory | null = null;
    @Output() close = new EventEmitter<void>();
    @Output() subcategoryCreated = new EventEmitter<void>();

    constructor(private subcategoryService: SubcategoryService) {}

    ngOnInit(): void {
        this.editMode = !!this.editedSubcategory;
    }

    onSubcategorySave(subcategoryForm: NgForm) {
        const subcategory: Subcategory = {
            subcategoryId: this.editedSubcategory?.subcategoryId ?? "",
            name: subcategoryForm.value.subcategoryName,
            type: subcategoryForm.value.subcategoryType
        };

        this.saving = true;
        this.error = false;
        this.quotaExceeded = false;

        this.subcategoryService.saveSubcategory(subcategory, !this.editMode).subscribe({
            next: () => {
                this.close.emit();
                this.subcategoryCreated.emit();
            },
            error: (errorData: any) => {
                this.saving = false;
                if (errorData.status === 409) {
                    this.quotaExceeded = true;
                } else {
                    this.error = true;
                }
            }
        });
    }
}
