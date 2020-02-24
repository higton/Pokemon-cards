import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CardService } from '../../services/card.service';
import { Card } from '../../models/Card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit {
  @Input() cards:Card[];

  imageUrl:string;
  
  constructor(
    private cardService:CardService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.cardService.codeFromSet = this.getCode();

    let code = this.getCode()
    this.subscribeCode(code)
  }

  getCode(){
    let code = this.route.snapshot.paramMap.get('code');
    return code
  }

  subscribeCode(code:string){
    if(code !== null){
      this.cardService.getCardsByCode1(code)
      
      this.cardService.cardByCode$.subscribe(data => {
        this.cards = data.cards;
        console.log(data);
      });
    }
  }
/* 
  sendGetRequest(){
    this.cardService.data$.subscribe(data => {
      this.cards = data.cards;
      console.log(this.cards);
    });
  }

  getHardCodedCards(){
    this.cards = this.cardService.getHardCodedCards();
  }
 */
  counter(i: number) {
    return new Array(i);
  }
}
