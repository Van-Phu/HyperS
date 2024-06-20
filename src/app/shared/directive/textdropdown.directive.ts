import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[textDropDownDirective]',
})

export class TextDropDownDirective implements AfterViewInit {
    constructor(private element: ElementRef) { }
    ngAfterViewInit(): void {
        const element = this.element.nativeElement as HTMLElement;
        if (element) {
            const kendoDropdownList = element.querySelector('kendo-dropdownlist');
            if (kendoDropdownList) {
                const buttonElement = kendoDropdownList.querySelector('button');
                if (buttonElement) {
                    const wrapperElement = buttonElement.querySelector('.k-icon-wrapper-host');
                    if (wrapperElement) {
                        const svgIcon = wrapperElement.querySelector('kendo-svgicon');
                        svgIcon.innerHTML = '';
                        svgIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" style="pointer-events: none;"><path d="m382.059 158.059-126.06 126.06-126.061-126.06L96 192l159.999 160L416 192z"></path></svg>`
                    }
                }
            }
        }
    }
}