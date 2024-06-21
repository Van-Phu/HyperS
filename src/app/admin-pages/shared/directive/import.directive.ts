import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[ImportImageDirective]',
})

export class ImportImageDirective implements OnInit {
    constructor(private element: ElementRef) { }
    ngOnInit(): void {
        const element = this.element.nativeElement as HTMLElement;
        if (element) {
            const kendoFileselect = element.querySelector('.k-upload-button-wrap');
            if(kendoFileselect){
                const button = kendoFileselect.querySelector('.k-button-text')
                if(button){
                    button.innerHTML = '<i class="fa-solid fa-arrow-up-from-bracket"></i>'
                }
            }
        }
    }
}