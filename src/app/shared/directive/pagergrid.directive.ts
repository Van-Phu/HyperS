import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[pagerGrid]',
})

export class PagerGridDirective implements AfterViewInit {
    constructor(private element: ElementRef) { }
    ngAfterViewInit(): void {
        const element = this.element.nativeElement as HTMLElement;
        if (element) {
            const label = element.querySelector('.k-label');
            if(label){
                label.innerHTML = 'Hiển thị mỗi trang';
            }
        }
    }
}