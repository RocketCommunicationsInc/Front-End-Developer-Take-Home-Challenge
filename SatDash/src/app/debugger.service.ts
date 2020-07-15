import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DebuggerService {
  debuggerMessages: string[] = [];

  add(message: string) {
    this.debuggerMessages.unshift(message);
  }

  clear() {
    this.debuggerMessages = [];
  }
}
