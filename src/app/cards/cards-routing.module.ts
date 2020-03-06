import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardsComponent } from './cards/cards.component';
import { CardSearchComponent } from './card-search/card-search.component';
import { SetsComponent } from './sets/sets.component';
import { AllCardsComponent } from './all-cards/all-cards.component';

const cardsRoutes: Routes = [
  { path: 'search', component: CardsComponent },
  { path: 'cards/page/:id', component: AllCardsComponent,
      children: [
        { path: 'card/:id', component: CardDetailComponent},
      ] 
  },
  { path: 'card/:id', component: CardDetailComponent, },
  { path: 'sets', component: SetsComponent,
       children: [
        { path: 'cards/:code', component: CardsComponent,
          children: [
            { path: 'page/:id', component: CardsComponent,
              children: [
                { path: 'card/:id', component: CardDetailComponent },
              ] }
          ]
         }
       ]
     },
];

@NgModule({
  imports: [
    RouterModule.forChild(cardsRoutes),
  ],

  exports: [RouterModule]
})
export class CardsRoutingModule { }
