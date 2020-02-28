import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
  constructor(
    private cardService:CardService,
    public cards:CardsComponent,
  ) { }

  ngOnInit(): void {
  }

  counter(i: number) {
    return new Array(i);
  }
}
