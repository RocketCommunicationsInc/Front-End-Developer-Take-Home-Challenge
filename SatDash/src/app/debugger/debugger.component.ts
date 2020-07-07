import { Component, OnInit } from '@angular/core';
import { DebuggerService } from '../debugger.service';

@Component({
  selector: 'app-debugger',
  templateUrl: './debugger.component.html',
  styleUrls: ['./debugger.component.scss'],
})
export class DebuggerComponent implements OnInit {
  // the debuggerService must be public because im binding it to a template.
  // angular only binds to public component properties
  constructor(public debuggerService: DebuggerService) {}

  ngOnInit(): void {}
}
