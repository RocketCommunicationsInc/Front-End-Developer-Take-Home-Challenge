import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.styl']
})
// header component for top toolbar
export class HeaderComponent implements OnInit {

    @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
    darkMode: boolean;

    constructor() {
    }

    ngOnInit(): void {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('dark-theme');
    }

    // change theme to dark theme
    darkTheme() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }

    // change theme to light theme
    lightTheme() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    }

    // emit sidebar event to sidebar component
    toggleSidebar() {
        this.toggleSidebarEvent.emit();
    }
}
