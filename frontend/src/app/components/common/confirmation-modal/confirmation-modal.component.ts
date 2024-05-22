import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SpinnerComponent} from "../spinner/spinner";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  imports: [
    SpinnerComponent,
    CommonModule
  ],
  standalone: true
})
export class ConfirmationModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() actionConfirmed = new EventEmitter<void>();

  @Input() heading = "Czy jesteś pewien?";
  @Input() description = "Czy na pewno chcesz zapisać?";
  @Input() actionName: string = "Zapisz";
  @Input() pending = false;

  onModalClose() {
    this.closeModal.emit();
  }

  onActionConfirmed() {
    this.actionConfirmed.emit();
  }
}
