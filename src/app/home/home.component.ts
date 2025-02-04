import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `

  <section class="hero-bg">
    <header class="brand-name">
<!--       <img class="brand-logo" src="/assets/LOGO-REALSTATE-01.svg"> -->
    <h1>Tu Camino al Hogar Perfecto</h1>
    <h2>Busca entre cientos de opciones con la garantia de anuncios actualizados periódicamente</h2>
    </header>
    <div class="input-containers">
      <div class="input-card">
        <form>
          <input type="text" placeholder="Buscar propiedades de renta">
          <button class="primary" type="button">BUSCAR</button>
        </form>
      </div>
    </div>
  </section>
  <section class="results">
    <app-housing-location 
      *ngFor="let housingLocation of housingLocationList" 
      [housingLocation]="housingLocation">
    </app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList:HousingLocation[] = [];
  housingService: HousingService = inject (HousingService);

  constructor () {
this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
  this.housingLocationList = housingLocationList;
});
  }
}
