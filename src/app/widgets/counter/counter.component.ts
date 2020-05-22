import {Component, SimpleChange, OnChanges, Input, NgModule} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.styl']
})

/*
Counter Widget
accepts: title and value
displays card with counter
 */

export class CounterComponent implements OnChanges {

    @Input() title: string;
    @Input() value: number;

    constructor() {
    }

    // listen for changes to @input variables from parent and updated in component
    ngOnChanges(changes: { [value: number]: SimpleChange }) {
        for (const propName in changes) {
            this[propName] = changes[propName].currentValue;
        }
    }
}
