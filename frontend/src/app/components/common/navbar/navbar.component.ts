import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {RouterLink} from "@angular/router";
import {HamburgerIconComponent} from "../icons/hamburger-icon.component";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    HamburgerIconComponent,
    NgIf,
    CommonModule
  ],
  standalone: true
})
export class NavbarComponent implements OnInit {
  isUserAuthenticated = false;

  constructor(private authService: AuthenticationService) {
  }

  onUserLogin() {
    this.authService.redirectToAuthenticationEndpoint();
  }

  onUserLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.authenticatedUser.subscribe(user => this.isUserAuthenticated = !!user);
  }

  onUserRegister() {
    this.authService.redirectToRegistrationEndpoint();
  }
}
