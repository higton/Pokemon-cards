import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardsComponent } from './cards/cards.component';
import { CardSearchComponent } from './card-search/card-search.component';
import { SetsComponent } from './sets/sets.component';
import { AuthGuard } from '../auth/auth.guard';

const cardsRoutes: Routes = [
  { path: 'search', component: CardSearchComponent },
  { path: 'card/:id', component: CardDetailComponent, },
  { path: '',
    component: CardSearchComponent,
   children: [
     { path: 'sets', component: SetsComponent,
       children: [
        { path: 'cards/:code', component: CardsComponent,
          children: [
            { path: ':id', component: CardDetailComponent },
            { path: 'page/:id', component: CardsComponent }
          ]
         }
       ]
     }
   ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(cardsRoutes),
  ],

  exports: [RouterModule]
})
export class CardsRoutingModule { }
