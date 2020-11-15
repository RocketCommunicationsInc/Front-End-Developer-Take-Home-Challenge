import {Component} from "@angular/core";
import {AlertsService} from "./service/alerts.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger(
      "slideInOutAnimation",
      [
        transition(":enter", [
          style({transform: "translateX(100%)"}),
          animate("200ms ease-in", style({transform: "translateX(0%)"}))
        ]),
        transition(":leave", [
          animate("200ms ease-in", style({transform: "translateX(100%)"}))
        ])
      ]
    )
  ]
})
export class AppComponent {
  title = "grm";

  constructor(public readonly alertsService: AlertsService) {
  }
}
