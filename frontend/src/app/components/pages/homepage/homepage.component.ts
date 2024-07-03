import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {Router, RouterLink} from "@angular/router";
import {CommonModule, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  imports: [RouterLink, CommonModule, NgOptimizedImage],
  standalone: true
})
export class HomepageComponent implements OnInit {
  isUserAuthenticated: boolean = false;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.authenticatedUser.subscribe(user => {
      this.isUserAuthenticated = !!user;
      if (this.isUserAuthenticated) {
        this.router.navigate(["/subcategories"]).then();
      }
    });
  }

  onAuthenticate() {
    this.authService.redirectToAuthenticationEndpoint();
  }

  onRegister() {
    this.authService.redirectToRegistrationEndpoint();
  }
}
