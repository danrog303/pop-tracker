import { Routes } from '@angular/router';
import {oauth2RouteGuard} from "./routeguards/oauth2.routeguard";
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {authenticatedRouteGuard} from "./routeguards/authenticated.routeguard";
import {HomepageComponent} from "./components/pages/homepage/homepage.component";
import {SubcategoryDisplayComponent} from "./components/pages/subcategory-display/subcategory-display.component";
import {SubcategoryDetailsComponent} from "./components/pages/subcategory-details/subcategory-details.component";

export const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'auth/oauth2', canActivate: [oauth2RouteGuard], component: AuthenticationComponent},

  {path: 'subcategories', component: SubcategoryDisplayComponent, canActivate: [authenticatedRouteGuard]},
  {path: 'subcategories/:subcategoryId', component: SubcategoryDetailsComponent, canActivate: [authenticatedRouteGuard]}
];
