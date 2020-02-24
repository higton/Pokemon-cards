import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Card } from 'src/app/models/Card';
import { CardService } from '../../services/card.service';

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
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.getIdToSubscribe();
  }

  getIdToSubscribe(){
    let id = this.route.snapshot.paramMap.get('id');

    this.cardService.getCardById(id);

    this.cardService.cardById$.subscribe(data => {
      this.card = data.card;
    });
  }
  goBackToCards(){
    console.log(this.cardService.codeFromSet)
    if(this.cardService.isCardSearched){
      this.router.navigate(['/home']);
    }
    else{
      this.router.navigate([`/sets/cards/${this.cardService.codeFromSet}`, { id: this.card.id }]);
    }
  }
}
