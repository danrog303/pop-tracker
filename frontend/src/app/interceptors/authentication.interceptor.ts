import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {environment} from "../../environments/environment";

/**
 * Adds Authentication HTTP header to ShelfSpace API requests.
 * If needed, tries to refresh the access token.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.urlWithParams.startsWith(environment.popTracker.apiEndpoint)) {
      return next.handle(req);
    }
    if (this.authService.authenticatedUser.value === null) {
      return next.handle(req);
    }

    const safetyThresholdInMs = 30000;
    if (this.authService.authenticatedUser.value!!.accessTokenExpiration.getTime() - safetyThresholdInMs <= new Date().getTime()) {
      this.authService.refreshTokens();
    }

    const bearerHeader = `Bearer ${this.authService.authenticatedUser.value!!.accessToken}`;
    const modifiedHeaders = req.headers.append("Authorization", bearerHeader);
    const modifiedRequest = req.clone({headers: modifiedHeaders});
    return next.handle(modifiedRequest);
  }
}
