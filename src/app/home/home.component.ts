import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HousingLocationComponent],
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
          <input type="text" [(ngModel)]="searchQuery" [ngModelOptions]="{standalone: true}" placeholder="Buscar propiedades de renta">
          <button class="primary" (click)="filterLocations()" type="button">BUSCAR</button>
        </form>
      </div>
    </div>
  </section>
  <section class="results">
    <app-housing-location 
      *ngFor="let housingLocation of filteredHousingLocationList" 
      [housingLocation]="housingLocation">
    </app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList:HousingLocation[] = [];

  filteredHousingLocationList: HousingLocation[] = []; // array con la lista filtrada de anuncios
  searchQuery: string = ''; // query para filtrar anuncios

  housingService: HousingService = inject (HousingService);

  constructor () {
  this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
  this.housingLocationList = housingLocationList;

  this.filteredHousingLocationList = housingLocationList; // muestra todas las locaciones cuando no hay query


});
  }


  filterLocations() {


    const query = this.searchQuery.toLowerCase().trim(); //convierte en minusculas
    this.filteredHousingLocationList = this.housingLocationList.filter(location =>
      location.city.toLowerCase().includes(query) // toma el query y filtra el array
    );
    
    console.log(this.filteredHousingLocationList);
  }

}
