import {ChangeDetectionStrategy, Component} from "@angular/core";

/**
 * Simple header component
 */
@Component({
  selector: "app-header",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
}
