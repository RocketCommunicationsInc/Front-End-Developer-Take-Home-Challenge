import {Component, OnInit} from "@angular/core";
import {animate, style, transition, trigger} from "@angular/animations";
import {EventService} from "./service/event.service";
import {filter} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

/**
 * Application component
 */
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
export class AppComponent implements OnInit {
  /**
   * Reflects the open/closed state of the slideout
   */
  readonly slideoutVisible = new BehaviorSubject<boolean>(false);

  /**
   * ctor
   * @param eventService
   */
  constructor(private readonly eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.getEventObservable().pipe(
      filter(event => event.type === "slideout")
    ).subscribe(event => this.slideoutVisible.next(event.data));
  }
}
