import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
    selector: '[appGestionDate]',
    providers: [{ provide: NG_VALIDATORS, useExisting: GestionDateDirective, multi: true }]
})
export class GestionDateDirective implements Validator {
    @Input('appGestionDate') minimumAge: number;
    age: number;

    constructor(private el: ElementRef) {}

    validate(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return null;
        }

        const birthDate = new Date(control.value);
        const today = new Date();
        this.age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            this.age--;
        }

        if (this.age < this.minimumAge) {
            window.alert('Vous devez avoir au moins 18 ans.'); // Afficher une alerte si l'âge est inférieur à 18
            return { 'ageInvalid': true };
        }

        return null;
    }
}
