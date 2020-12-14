import { Directive, Input, ElementRef, Renderer2, HostListener, Host } from '@angular/core';
import { Sort } from '../util/sort';

@Directive({
    selector: '[appSort]'
})

export class SortDirective {
    @Input() appSort: Array<any>;
    
    constructor(
        private renderer: Renderer2,
        private targetElem: ElementRef
    ) {}
    
    @HostListener("click")
    sortData() {
        const sort = new Sort();
        const elem = this.targetElem.nativeElement;
        const order = elem.getAttribute("data-order");
        const type = elem.getAttribute("data-type");
        const property = elem.getAttribute("data-name");

        const sorted = document.querySelectorAll(".sortable.asc, .sortable.desc");

        [].forEach.call(sorted, function(el) {
            el.classList.remove("asc", "desc");
        });

        if(order == "desc") {
            this.appSort.sort(sort.startSort(property, order));
            elem.setAttribute("data-order", "asc");
            elem.classList.add("asc");
        } else {
            this.appSort.sort(sort.startSort(property, order));
            elem.setAttribute("data-order", "desc");
            elem.classList.add("desc");
        }
    }
}