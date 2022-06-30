import { Component } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent {

  constructor(private location: Location) { }

  back(): void {
    this.location.back()
  }
}
