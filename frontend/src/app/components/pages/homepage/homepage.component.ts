import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {RouterLink} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  imports: [RouterLink, CommonModule],
  standalone: true
})
export class HomepageComponent implements OnInit {
  isUserAuthenticated: boolean = false;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.authenticatedUser.subscribe(user => this.isUserAuthenticated = !!user);
  }

  onAuthenticate() {
    this.authService.redirectToAuthenticationEndpoint();
  }
}
