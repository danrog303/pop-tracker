import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {environment} from "../../environments/environment";

/**
 * This route guard is used as part of the Oauth2 authorization code grant flow. It looks for
 * Oauth2 authorization code and exchanges it for access & refresh JWT tokens.
 */
export const oauth2RouteGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const oauth2Code = route.queryParams['code'];
  if (oauth2Code && authService.authenticatedUser.value === null) {
    authService.exchangeAuthorizationCodeForTokens(oauth2Code);
  }

  router.navigate(["/subcategories"]).then();
  return false;
};

