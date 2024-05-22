import {Component, EventEmitter, Output} from '@angular/core';
import {ErrorIconComponent} from "../icons/error-icon.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  imports: [
    ErrorIconComponent,
    CommonModule
  ],
  standalone: true
})
export class ErrorAlertComponent {
  @Output() tryAgain = new EventEmitter<void>();

  onTryAgain() {
    this.tryAgain.emit();
  }
}
