import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/models/Card';
import { CardService } from '../../services/card.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
  card: Card;

  constructor(
    private cardService:CardService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    this.cardService.getCardById(id);

    this.cardService.cardById$.subscribe(data => {
      console.log(data.card);
      this.card = data.card;
    });

  }
}
