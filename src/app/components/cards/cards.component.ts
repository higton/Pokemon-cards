import { Component, OnInit, Injectable } from '@angular/core';
import { CardService } from '../../services/card.service';
import { Router} from '@angular/router';
import { Card } from '../../models/Card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit {
  cards:Card[];

  imageUrl:string;
  
  constructor(private cardService:CardService) { 
  }

  ngOnInit(): void {
  }

  sendGetRequest(){
    this.cardService.data$.subscribe(data => {
      this.cards = data.cards;
      console.log(this.cards);
    });
  }

  getHardCodedCards(){
    this.cards = this.cardService.getHardCodedCards();
  }

  counter(i: number) {
    return new Array(i);
  }
}
