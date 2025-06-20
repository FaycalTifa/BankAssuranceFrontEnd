import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appSeparateurMilliers]'
})
export class SeparateurMilliersDirective {

    private el: HTMLInputElement;

    constructor(private elementRef: ElementRef) {
        this.el = this.elementRef.nativeElement;
    }

    @HostListener('input')
    onInput(): void {
        const raw = this.el.value.replace(/\s/g, '').replace(/\D/g, '');
        if (!raw) {
            this.el.value = '';
            return;
        }

        const formatted = this.formatWithSpaces(raw);
        this.el.value = formatted;

        // Positionne le curseur à la fin
        setTimeout(() => {
            this.el.selectionStart = this.el.selectionEnd = this.el.value.length;
        });
    }

    private formatWithSpaces(value: string): string {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}
