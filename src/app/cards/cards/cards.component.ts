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
    if(!this.cardService.isCardSearched){
      this.pageId = +this.getPageId();
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

  getPageId():number{
    let id = +this.route.snapshot.paramMap.get('id');
    return id
  }

  subscribeToPageId(pageId:number, code:string){
    console.log('passed here')
    if(pageId !== null && code !== null){      
      this.cardService.getResponseCardsById(pageId, code).subscribe(data => {
        this.totalNumberOfCards = +data.headers.get('Total-Count')
        this.numberOfPages = this.getNumberOfPages(50, this.totalNumberOfCards)
      });
      this.cardService.getCardsById(pageId, code).subscribe(data => {
        this.cards = data.cards;
        console.log(this.cards);
      });
    }
  }

  nextPage(){
    this.pageId = this.pageId + 1;
    this.subscribeToPageId(this.pageId, this.cardService.codeFromSet);
    this.navigateToPage(this.pageId);
  }

  previousPage(){
    this.pageId = this.pageId - 1;
    this.subscribeToPageId(this.pageId, this.cardService.codeFromSet);
    this.navigateToPage(this.pageId);
  }

  navigateToPage(pageId:number){
    console.log('navigate to ' + pageId)
    this.cardService.pageId = pageId
    this.subscribeToPageId(pageId, this.cardService.codeFromSet);
    this.router.navigate([`/sets/cards/${this.cardService.codeFromSet}/page`, pageId]);
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
