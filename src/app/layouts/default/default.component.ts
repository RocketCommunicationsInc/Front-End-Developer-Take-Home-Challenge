import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.styl']
})

/*
Default layout which pulls in:
    components/header,
    components/sidebar and
    router-outlet
*/
export class DefaultComponent implements OnInit {

    sideBarOpen = true;

    // listen for window resize
    @HostListener('window:resize', [])
    private onResize() {
        this.checkSize();
    }

    constructor() {}

    // check size of screen width and adjust sidebar if small screen
    checkSize() {
        if (window.innerWidth < 800) {
            this.sideBarOpen = false;
        }
    }

    // toggle sidebar
    sideBarToggler(e) {
        this.sideBarOpen = !this.sideBarOpen;
    }

    ngOnInit(): void {
        this.checkSize();
    }
}
