import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { CardsComponent } from '../cards/cards.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
  constructor(
    public cardService:CardService,
    public cards:CardsComponent,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log(this.cardService.getId(this.route))
  }

  counter(i: number) {
    return new Array(i);
  }
}
