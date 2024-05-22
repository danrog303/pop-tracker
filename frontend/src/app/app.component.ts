import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthenticationService} from "./services/authentication.service";
import {NavbarComponent} from "./components/common/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
