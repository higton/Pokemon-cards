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
  pageId:number; 
  totalNumberOfCards:number;
  numberOfPages:number;

  constructor(
    private cardService:CardService,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.pageId = +this.cardService.getPageId(this.route);
    if(!this.cardService.isCardSearched){
      this.pageId = +this.cardService.getPageId(this.route);
      this.cardService.pageId = this.pageId

      this.cardService.codeFromSet = this.getCode();

      this.subscribeToPageId(this.pageId, this.cardService.codeFromSet);
    }
  }

  getCode(){
    let code:string

    this.route.parent.params.subscribe( (params) => {
      code = params['code'];
    });
    return code
  }

  subscribeToPageId(pageId:number, code:string){
    console.log('code ' + code + ' number ' + pageId)
    if(pageId !== undefined && code !== undefined){      
      this.cardService.getResponseCardsById(pageId, code).subscribe(data => {
        this.totalNumberOfCards = +data.headers.get('Total-Count')
        this.numberOfPages = this.getNumberOfPages(50, this.totalNumberOfCards)
        console.log('okok' + this.numberOfPages)
      });
      this.cardService.getCardsById(pageId, code).subscribe(data => {
        this.cards = data.cards;
        console.log(this.cards);
      });
    }
    // REFACTOR THISS!!!
    // IF the function was called by all cards component
    if(code === undefined && pageId !== null){
      console.log('outpost')

      this.numberOfPages = 122

      this.cardService.getAllCards(pageId).subscribe(data => {
        this.cards = data.cards;
        console.log(this.cards);
      });
    }
  }

  navigateToPage(pageId:number){
    console.log('navigate to ' + pageId)
    this.cardService.pageId = pageId
    this.subscribeToPageId(pageId, this.cardService.codeFromSet);
    this.router.navigate([`../`, pageId], {relativeTo: this.route});
  }

  counter(i: number) {
    return new Array(i);
  }

  returnNumberOfPages(){
    return this.numberOfPages;
  }

  //PURE
  getNumberOfPages(cardsInOnePage:number, totalNumberOfCardsRequested:number){
    return +(totalNumberOfCardsRequested/cardsInOnePage).toPrecision(1) + 1
  }
}
