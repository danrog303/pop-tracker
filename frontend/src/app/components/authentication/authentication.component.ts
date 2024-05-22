import { Component } from "@angular/core";
import {SpinnerComponent} from "../common/spinner/spinner";

/**
 * This component is rendered during oauth2 code-token exchange.
 * Proper authentication logic is done by the oauth2 route-guard.
 */
@Component({
  selector: 'app-authentication',
  template: '<app-spinner />',
  imports: [
    SpinnerComponent
  ],
  standalone: true
})
export class AuthenticationComponent {
}
