import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {GameStatus} from "../../../models/game.model";
import {MovieStatus} from "../../../models/movie.model";
import {BookStatus} from "../../../models/book.model";
import SubcategoryItem from "../../../models/subcategory-item.type";
import {SubcategoryItemService} from "../../../services/subcategory-item.service";
import {NgIf} from "@angular/common";
import {SpinnerComponent} from "../../common/spinner/spinner";
import SubcategoryType from "../../../models/subcategory-type.enum";

@Component({
    selector: 'app-subcategory-item-edit',
    templateUrl: './subcategory-item-edit.component.html',
    imports: [
        FormsModule,
        NgIf,
        SpinnerComponent
    ],
    standalone: true
})
export class SubcategoryItemEditComponent implements OnInit{
    /**
     * If false, then form is currently in the "create new item" mode.
     * If true, then form is in the "edit the existing item" mode.
     */
    editMode = false;

    /**
     * If true, then form is currently waiting for API response.
     */
    pending = false;

    /**
     * Two-way bound value of "item status" form field.
     */
    chosenItemStatus: GameStatus | MovieStatus | BookStatus = GameStatus.FINISHED;

    @Input() subcategoryId: string = "";
    @Input() subcategoryType: SubcategoryType = SubcategoryType.BOOK;
    @Input() editedItem: SubcategoryItem | any | null = null;
    @Output() close = new EventEmitter<void>();
    @Output() itemSaved = new EventEmitter<void>();

    error = false;
    quotaExceeded = false;

    constructor(private subcategoryItemService: SubcategoryItemService) {}

    ngOnInit() {
        this.editMode = !!this.editedItem;
        if (this.editedItem) {
            this.chosenItemStatus = this.editedItem.status;
        }
    }

    onSaveItem(shelfItemEditForm: NgForm) {
        let subcategoryItem: any;

        console.log(this.subcategoryType);
        console.log(shelfItemEditForm.value);
        console.log("Edited item is", this.editedItem)

        if (this.subcategoryType == SubcategoryType.BOOK) {
            subcategoryItem = {
                bookId: this.editedItem?.bookId ?? null,
                name: shelfItemEditForm.value.name,
                status: shelfItemEditForm.value.status,
                rating: shelfItemEditForm.value.rating,
                author: shelfItemEditForm.value.author,
                pagesNumber: shelfItemEditForm.value.pagesNumber,
            };
        } else if (this.subcategoryType == SubcategoryType.MOVIE) {
            subcategoryItem = {
                movieId: this.editedItem?.movieId ?? null,
                name: shelfItemEditForm.value.name,
                status: shelfItemEditForm.value.status,
                rating: shelfItemEditForm.value.rating,
                director: shelfItemEditForm.value.director
            };
        } else if (this.subcategoryType == SubcategoryType.GAME) {
            subcategoryItem = {
                gameId: this.editedItem?.gameId ?? null,
                name: shelfItemEditForm.value.name,
                status: shelfItemEditForm.value.status,
                rating: shelfItemEditForm.value.rating,
                platform: shelfItemEditForm.value.platform,
                percentage: shelfItemEditForm.value.percentage
            };
        }

        this.pending = true;
        this.error = false;
        this.quotaExceeded = false;

        const apiCallHandle = {
            next: this.handleItemSaved.bind(this),
            error: this.handleError.bind(this)
        };

        if (this.editMode) {
            this.subcategoryItemService.updateSubcategoryItem(this.subcategoryId, subcategoryItem).subscribe(apiCallHandle);
        } else {
            this.subcategoryItemService.createSubcategoryItem(this.subcategoryId, subcategoryItem).subscribe(apiCallHandle);
        }
    }

    private handleItemSaved() {
        this.pending = false;
        this.itemSaved.emit();
        this.close.emit();
    }

    private handleError(errorData: any) {
        this.pending = false;
        if (errorData?.status === 409) {
            this.quotaExceeded = true;
        } else {
            this.error = true;
        }
    }

    protected readonly SubcategoryType = SubcategoryType;
    protected readonly String = String;
}
