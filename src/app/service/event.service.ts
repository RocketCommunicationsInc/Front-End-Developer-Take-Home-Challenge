import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {EventData} from "../model/event-data";

/**
 * Simple service for message passing. A more robust solution would have a map of keys to Observables to emulate
 * channels, but that's not needed for this application.
 */
@Injectable({ providedIn: "root" })
export class EventService {
  private readonly eventSubject = new Subject<EventData>();

  /**
   * Get the event observable. This observable receives all messages, and its up to the consumer to filter down
   * to the desired ones by type.
   */
  public getEventObservable(): Observable<EventData> {
    return this.eventSubject.asObservable();
  }

  /**
   * Send an event.
   * @param event
   */
  public sendEvent(event: EventData): void {
    this.eventSubject.next(event);
  }
}
