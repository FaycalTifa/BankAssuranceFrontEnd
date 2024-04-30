import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appFormatMontant]'
})
export class FormatMontantDirective {

  //  @Input('appFormatMontant') allowedTypes: string[] = ['text', 'number'];

    constructor( private el: ElementRef) { }

    @HostListener('input', ['$event'])
    onInput(event: any) {
        // Récupérer la valeur saisie
        let value = event.target.value;

        // Supprimer tous les espaces et séparateurs de milliers existants
        value = value.replace(/\s/g, '');

        // Supprimer les caractères non numériques
        value = value.replace(/\D/g, '');

        // Formater en milliers
        const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        // Mettre à jour la valeur dans le champ
        this.el.nativeElement.value = formattedValue;
    }
}
