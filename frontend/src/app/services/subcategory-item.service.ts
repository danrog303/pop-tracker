import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import SubcategoryItem from "../models/subcategory-item.type";

/**
 * Allows to create, update and delete items using the REST API.
 */
@Injectable({providedIn: 'root'})
export class SubcategoryItemService {
    constructor(private http: HttpClient) {}

    createSubcategoryItem(shelfId: string, subcategoryItem: SubcategoryItem): Observable<SubcategoryItem> {
        let endpoint = `${environment.popTracker.apiEndpoint}/subcategories/${shelfId}`;
        if (subcategoryItem.hasOwnProperty('director')) {
            endpoint += '/movies';
        } else if (subcategoryItem.hasOwnProperty('author')) {
            endpoint += '/books';
        } else if (subcategoryItem.hasOwnProperty('platform')) {
            endpoint += '/games';
        }

        return this.http.post<SubcategoryItem>(endpoint, subcategoryItem);
    }

    updateSubcategoryItem(shelfId: string, subcategoryItem: SubcategoryItem): Observable<SubcategoryItem> {
        let itemType = '';
        let idField = '';
        if (subcategoryItem.hasOwnProperty('director')) {
            itemType = 'movies';
            idField = 'movieId';
        } else if (subcategoryItem.hasOwnProperty('author')) {
            itemType = 'books';
            idField = 'bookId';
        } else if (subcategoryItem.hasOwnProperty('platform')) {
            itemType = 'games';
            idField = 'gameId';
        }

        console.log("Item type is", itemType, "id field is", idField, "item is", subcategoryItem);

        // @ts-ignore
        const endpoint = `${environment.popTracker.apiEndpoint}/${itemType}/${subcategoryItem[idField]}`;
        return this.http.put<SubcategoryItem>(endpoint, subcategoryItem);
    }

    /**
     * Sends request to the ShelfSpace API to delete the item from the specified shelf.
     */
    deleteSubcategoryItem(subcategoryId: string, subcategoryItem: SubcategoryItem): Observable<SubcategoryItem> {
        let itemType = '';
        let idField = '';
        if (subcategoryItem.hasOwnProperty('director')) {
            itemType = 'movies';
            idField = 'movieId';
        } else if (subcategoryItem.hasOwnProperty('author')) {
            itemType = 'books';
            idField = 'bookId';
        } else if (subcategoryItem.hasOwnProperty('platform')) {
            itemType = 'games';
            idField = 'gameId';
        }

        // @ts-ignore
        const endpoint = `${environment.popTracker.apiEndpoint}/${itemType}/${subcategoryItem[idField]}`;
        return this.http.delete<SubcategoryItem>(endpoint);
    }
}
