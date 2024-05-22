import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../environments/environment";
import Subcategory from "../models/subcategory.model";
import {AuthenticationService} from "./authentication.service";
import SubcategoryItem from "../models/subcategory-item.type";
import SubcategoryType from "../models/subcategory-type.enum";

/**
 * Provides basic CRUD operations on user's subcategories.
 */
@Injectable({providedIn: 'root'})
export class SubcategoryService {
  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  /**
   * Sends request to the API to create or update the given subcategory.
   */
  saveSubcategory(subcategory: Subcategory, create=false): Observable<Subcategory> {
    const userProfileEndpoint = `${environment.popTracker.apiEndpoint}/users/${this.authService.authenticatedUser.value?.userId}`;
    this.http.get(userProfileEndpoint).subscribe();

    if (create) {
      const endpoint = `${environment.popTracker.apiEndpoint}/subcategories`;
      return this.http.post<Subcategory>(endpoint, subcategory);
    } else {
      const endpoint = `${environment.popTracker.apiEndpoint}/subcategories/${subcategory.subcategoryId}`;
      return this.http.put<Subcategory>(endpoint, subcategory);
    }
  }

  /**
   * Sends request to the API to delete the given subcategory.
   */
  deleteSubcategory(subcategory: Subcategory): Observable<Subcategory> {
    const endpoint = `${environment.popTracker.apiEndpoint}/subcategories/${subcategory.subcategoryId}`;
    return this.http.delete<Subcategory>(endpoint);
  }

  /**
   * Sends request to the API to prefetch user's shelves.
   */
  getUserShelves(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${environment.popTracker.apiEndpoint}/subcategories`);
  }

  /**
   * Sends request to the API to fetch a specific subcategory.
   */
  getSubcategory(subcategoryId: string): Observable<Subcategory> {
    return this.http.get<Subcategory>(`${environment.popTracker.apiEndpoint}/subcategories/${subcategoryId}`);
  }

  getItemsOfSubcategory(subcategory: Subcategory): Observable<SubcategoryItem[]> {
    let endpointBase = `${environment.popTracker.apiEndpoint}/subcategories/${subcategory.subcategoryId}`;
    console.log(subcategory);

    if (subcategory.type == "BOOK") {
      endpointBase += "/books";
    }
    else if (subcategory.type == "GAME") {
        endpointBase += "/games";
    }
    else if (subcategory.type == "MOVIE") {
        endpointBase += "/movies";
    }

    return this.http.get<SubcategoryItem[]>(endpointBase);
  }
}
