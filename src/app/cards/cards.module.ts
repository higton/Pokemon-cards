import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardsComponent } from './cards/cards.component';
import { CardItemComponent } from './card-item/card-item.component';

import { CardsRoutingModule } from './cards-routing.module';
import { CardSearchComponent } from './card-search/card-search.component';
import { HomeComponent } from './home/home.component';
import { SetsComponent } from './sets/sets.component';
import { SetItemComponent } from './set-item/set-item.component';


@NgModule({
  imports: [
    CommonModule,
    CardsRoutingModule
  ],
  declarations: [
    CardDetailComponent,
    CardsComponent,
    CardItemComponent,
    CardSearchComponent,
    HomeComponent,
    SetsComponent,
    SetItemComponent
  ]
})
export class CardsModule { }
