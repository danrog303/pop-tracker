import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SubcategoryItemService} from "../../../services/subcategory-item.service";
import SubcategoryItem from "../../../models/subcategory-item.type";
import {ConfirmationModalComponent} from "../../common/confirmation-modal/confirmation-modal.component";

@Component({
    selector: 'app-subcategory-item-delete',
    templateUrl: './subcategory-item-delete.component.html',
    imports: [
        ConfirmationModalComponent
    ],
    standalone: true
})
export class SubcategoryItemDeleteComponent {
    deleting = false;
    @Input() subcategoryId: string = "";
    @Input() itemToDelete: SubcategoryItem | null = null;
    @Output() close = new EventEmitter<void>();
    @Output() itemDeleted = new EventEmitter<void>();

    constructor(private subcategoryItemService: SubcategoryItemService) {}

    onDeleteItem() {
        if (this.itemToDelete === null) {
            return;
        }

        this.deleting = true;

        this.subcategoryItemService.deleteSubcategoryItem(this.subcategoryId, this.itemToDelete).subscribe(() => {
            this.deleting = false;
            this.itemDeleted.emit();
            this.close.emit();
        });
    }

    onCancel() {
        this.close.emit();
    }
}
