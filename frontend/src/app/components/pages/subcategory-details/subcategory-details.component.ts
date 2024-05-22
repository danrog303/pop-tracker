import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Game} from "../../../models/game.model";
import {Book} from "../../../models/book.model";
import {Movie} from "../../../models/movie.model";
import Subcategory from "../../../models/subcategory.model";
import {SubcategoryService} from "../../../services/subcategory.service";
import {SpinnerComponent} from "../../common/spinner/spinner";
import {DeleteIconComponent} from "../../common/icons/delete-icon.component";
import {EditIconComponent} from "../../common/icons/edit-icon.component";
import {AddIconComponent} from "../../common/icons/add-icon.component";
import {ErrorAlertComponent} from "../../common/error-alert/error-alert.component";
import {DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import SubcategoryItem from "../../../models/subcategory-item.type";
import {SubcategoryEditComponent} from "../subcategory-edit/subcategory-edit.component";
import {SubcategoryDeleteComponent} from "../subcategory-delete/subcategory-delete.component";
import {SubcategoryItemEditComponent} from "../subcategory-item-edit/subcategory-item-edit.component";
import SubcategoryType from "../../../models/subcategory-type.enum";
import {SubcategoryItemDeleteComponent} from "../subcategory-item-delete/subcategory-item-delete.component";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
    selector: 'app-subcategory-details',
    templateUrl: './subcategory-details.component.html',
    imports: [
        SpinnerComponent,
        DeleteIconComponent,
        EditIconComponent,
        AddIconComponent,
        ErrorAlertComponent,
        NgIf,
        NgForOf,
        NgSwitch,
        FormsModule,
        NgSwitchCase,
        DatePipe,
        SubcategoryEditComponent,
        SubcategoryDeleteComponent,
        SubcategoryItemEditComponent,
        SubcategoryItemDeleteComponent,
    ],
    standalone: true
})
export class SubcategoryDetailsComponent implements OnInit {
    loading = true;
    error = false;
    deletingSubcategory = false;
    deletingSubcategoryItem = false;
    editingSubcategory = false;
    editingSubcategoryItem = false;

    filterQuery: string = "";

    editedSubcategoryItem: SubcategoryItem | null = null;
    deletedSubcategoryItem: SubcategoryItem | null = null;

    subcategory: Subcategory | null = null;
    subcategoryItems: SubcategoryItem[] | any[] = [];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private subcategoryService: SubcategoryService) {}

    ngOnInit() {
        this.refreshSubcategoryDetails();
    }

    getFilteredSubcategoryItems() {
        return this.subcategoryItems.filter((item: SubcategoryItem) => {
            return item.name.toLowerCase().includes(this.filterQuery.toLowerCase());
        });
    }

    refreshSubcategoryDetails() {
        this.error = false;
        this.route.params.subscribe(routeParams => {
            const subcategoryId = routeParams['subcategoryId'];
            this.subcategoryService.getSubcategory(subcategoryId).subscribe({
                next: subcategoryData => {
                    console.log("Fetched subcategory")
                    this.loading = false;
                    this.subcategory = subcategoryData;

                    this.subcategoryService.getItemsOfSubcategory(this.subcategory).subscribe({
                        next: itemsData => {
                            console.log("Fetched subcategory items", itemsData)
                            this.subcategoryItems = itemsData;
                        },
                        error: errorData => {
                            console.error("Could not fetch subcategory items", errorData);
                            this.error = true;
                        }
                    });
                },
                error: errorData => {
                    this.loading = false;
                    if (errorData.status == 404 || errorData.status == 403) {
                        this.router.navigate(['/subcategories']).then();
                    } else {
                        this.error = true;
                    }
                }
            });
        });
    }

    onSubcategoryEdit() {
        this.editingSubcategory = true;
    }

    onSubcategoryDelete() {
        this.deletingSubcategory = true;
    }

    onSubcategoryItemCreate() {
        this.editedSubcategoryItem = null;
        this.editingSubcategoryItem = true;
    }

    onSubcategoryItemEdit(subcategoryItem: SubcategoryItem) {
        this.editedSubcategoryItem = subcategoryItem;
        this.editingSubcategoryItem = true;
    }

    onSubcategoryItemDelete(subcategoryItem: SubcategoryItem) {
        this.deletedSubcategoryItem = subcategoryItem;
        this.deletingSubcategoryItem = true;
    }

    protected readonly SubcategoryType = SubcategoryType;
}
