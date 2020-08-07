import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardsComponent } from './cards/cards.component';
import { CardItemComponent } from './card-item/card-item.component';

import { CardsRoutingModule } from './cards-routing.module';
import { CardSearchComponent } from './card-search/card-search.component';
import { SetsComponent } from './sets/sets.component';
import { SetItemComponent } from './set-item/set-item.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AllCardsComponent } from './all-cards/all-cards.component';
import { CardDetailAttackComponent } from './card-detail-attack/card-detail-attack.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    CardDetailComponent,
    CardsComponent,
    CardItemComponent,
    CardSearchComponent,
    SetsComponent,
    SetItemComponent,
    PaginationComponent,
    AllCardsComponent,
    CardDetailAttackComponent,
    LoadingComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CardsRoutingModule,
    NgbModule,
  ],
  exports: [ CardSearchComponent, CardsComponent, LoadingComponent ],
})
export class CardsModule { }

export {CardSearchComponent, CardsComponent, LoadingComponent};
