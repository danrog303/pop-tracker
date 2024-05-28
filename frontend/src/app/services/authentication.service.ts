import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { UserDetails } from "../models/user-details.model";
import { environment } from "../../environments/environment";

/**
 * Provides standard authentication related operations (log in, log out, refreshing JWT tokens).
 */
@Injectable({providedIn: 'root'})
export class AuthenticationService {
  authenticatedUser = new BehaviorSubject<UserDetails | null>(null);

  constructor(private router: Router, private http: HttpClient) {}

  /**
   * Sends user to the authentication website.
   */
  redirectToAuthenticationEndpoint() {
    const authenticationUrl = new URL(environment.oauth2.authEndpoint);
    authenticationUrl.searchParams.append("client_id", environment.oauth2.clientId);
    authenticationUrl.searchParams.append("response_type", "code");
    authenticationUrl.searchParams.append("scope","email openid phone");
    authenticationUrl.searchParams.append("redirect_uri", environment.oauth2.redirectUrl);
    window.location.href = authenticationUrl.href;
  }

  /**
   * Sends user to the registration website.
   */
  redirectToRegistrationEndpoint() {
    const authenticationUrl = new URL(environment.oauth2.registerEndpoint);
    authenticationUrl.searchParams.append("client_id", environment.oauth2.clientId);
    authenticationUrl.searchParams.append("response_type", "code");
    authenticationUrl.searchParams.append("scope","email openid phone");
    authenticationUrl.searchParams.append("redirect_uri", environment.oauth2.redirectUrl);
    window.location.href = authenticationUrl.href;
  }

  /**
   * Exchanges oauth2 authorization code for access & refresh tokens.
   */
  exchangeAuthorizationCodeForTokens(oauth2AuthorizationCode: string) {
    const authRequest = new URLSearchParams();
    const authRequestHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    authRequest.append('grant_type', 'authorization_code');
    authRequest.append('code', oauth2AuthorizationCode);
    authRequest.append('redirect_uri', environment.oauth2.redirectUrl);
    authRequest.append('client_id', environment.oauth2.clientId);

    this.http.post(environment.oauth2.authTokenEndpoint, authRequest, {headers: authRequestHeaders}).subscribe(
      (authResponse: any) => {
        const user = new UserDetails(authResponse.access_token, authResponse.refresh_token);
        const userJson = JSON.stringify(user);
        localStorage.setItem("loggedInUserDetails", userJson);
        this.authenticatedUser.next(user);
      }
    );
  }

  /**
   * Refreshes JWT access token. Logs out the user, if tokens are invalid.
   */
  refreshTokens() {
    if (this.authenticatedUser.value === null) {
      return;
    }

    const refreshTokenRequest = new URLSearchParams();
    const refreshTokenRequestHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    refreshTokenRequest.append('grant_type', 'refresh_token');
    refreshTokenRequest.append('client_id', environment.oauth2.clientId);
    refreshTokenRequest.append('refresh_token', this.authenticatedUser.value!!.refreshToken);

    this.http.post(environment.oauth2.authTokenEndpoint, refreshTokenRequest, {headers: refreshTokenRequestHeaders})
      .subscribe({
        next: (refreshTokenResponse: any) => {
          const user = new UserDetails(refreshTokenResponse.access_token, this.authenticatedUser.value!!.refreshToken);
          const userJson = JSON.stringify(user);
          localStorage.setItem("loggedInUserDetails", userJson);
          this.authenticatedUser.next(user);
        },
        error: (error: any) => {
          console.error(error);
          this.logout();
        }
      });
  }

  /**
   * Tries to automatically log in user, if there is a valid, non-expired refresh token in the browser's local storage.
   */
  autoLogin() {
    const userJson = localStorage.getItem("loggedInUserDetails");

    if (userJson) {
      const user: any = JSON.parse(userJson);
      const userInstance = new UserDetails(user.accessToken, user.refreshToken);
      this.authenticatedUser.next(userInstance);

      this.refreshTokens();
    }
  }

  /**
   * Destroys user tokens and logs out.
   */
  logout() {
    localStorage.removeItem("loggedInUserDetails");
    this.authenticatedUser.next(null);
    this.router.navigate(['']).then();
  }
}
