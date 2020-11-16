import {ChangeDetectionStrategy, Component} from "@angular/core";
import {EventService} from "../../service/event.service";

/**
 * Slideout component that contains other UI components
 */
@Component({
  selector: "app-slideout",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./slideout.component.html",
  styleUrls: ["./slideout.component.scss"]
})
export class SlideoutComponent {

  /**
   * ctor
   * @param eventService
   */
  constructor(private readonly eventService: EventService) {
  }

  /**
   * Called when the "X" is clicked to close the panel
   */
  closeSlideout(): void {
    this.eventService.sendEvent({
      type: "slideout",
      data: false
    });
  }
}
