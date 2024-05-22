import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {map, tap} from "rxjs";


/**
 * Allows only authenticated users to activate the given path.
 */
export const authenticatedRouteGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.authenticatedUser.pipe(
    map(user => !!user),
    tap(isUserAuthenticated => {
      if (!isUserAuthenticated) {
        router.navigate(['/']).then();
      }
    })
  );
}
