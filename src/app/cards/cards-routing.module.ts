import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardDetailComponent } from './card-detail/card-detail.component';
import { HomeComponent } from './home/home.component';
import { CardsComponent } from './cards/cards.component';
import { CardSearchComponent } from './card-search/card-search.component';

const cardsRoutes: Routes = [
  { path: 'search', component: CardSearchComponent },
  { path: 'sets/cards/:code', component: CardsComponent,  data: { animation: 'card' }},
  { path: 'card/:id', component: CardDetailComponent, },
  { path: 'home', component: HomeComponent, data: { animation: 'cards' } },
];

@NgModule({
  imports: [RouterModule.forChild(cardsRoutes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
