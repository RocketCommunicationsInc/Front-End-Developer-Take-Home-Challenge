import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: "app-header",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  @Output() alertButtonSelected = new EventEmitter<void>();

  onAlertButtonSelected(): void {
    this.alertButtonSelected.emit();
  }
}
