import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { ActivatedRoute } from '@angular/router';

import { Card } from '../../models/Card';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.css']
})
export class AllCardsComponent implements OnInit {
  cards:Card[];

  constructor(
    private route: ActivatedRoute,
    private cardService:CardService,
  ) { }

  ngOnInit(): void {
    this.subscribeToAllCardsFromThePage()
  }

  getPageId():number{
    let id = +this.route.snapshot.paramMap.get('id');
    return id
  }

  subscribeToAllCardsFromThePage(){
    console.log('okidoki ' + this.getPageId())
    let pageId = this.getPageId()
    if(pageId !== null){
      this.cardService.getAllCards(pageId).subscribe(data => {
        this.cards = data.cards
        console.log(this.cards)
      });
    }
  }

}
