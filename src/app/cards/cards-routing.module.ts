import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardDetailComponent } from './card-detail/card-detail.component';
import { HomeComponent } from './home/home.component';
import { CardsComponent } from './cards/cards.component';

const cardsRoutes: Routes = [
  { path: 'sets/cards/:code', component: CardsComponent },
  { path: 'card/:id', component: CardDetailComponent, data: {animation: 'card'} },
  { path: 'home', component: HomeComponent, data: { animation: 'cards'} },
];

@NgModule({
  imports: [RouterModule.forChild(cardsRoutes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
