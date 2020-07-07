import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ActivatedRoute, Router, ChildActivationStart } from '@angular/router';
import { Observable } from 'rxjs';

import { CardService } from '../../services/card.service';
import { Card } from '../../models/Card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit {
  // TODO: instead of using cards:any, use cards:Card[]
  @Input() cards:any;

  imageUrl:string;
  pageId:number; 
  totalNumberOfCards:number;
  numberOfPages:number;
  message: any;

  state$: Observable<any>;
  
  constructor(
    public cardService:CardService,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.cardService.currentMessage.subscribe(message => this.cards = message );
    
    console.log(window.history.state);

    this.cards = this.getCardsFromState();

    this.pageId = +this.cardService.getPageId(this.route);

    this.cardService.codeFromSet = this.getCode();
    
    this.subscribeToPageId(this.pageId, this.cardService.codeFromSet);
    
  }

  getCardsFromState(){
    return window.history.state.cards;
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
    // IF the function was called by allCardsComponent
    if(code === undefined && pageId !== null && pageId !== 0){
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

  //PURE
  getNumberOfPages(cardsInOnePage:number, totalNumberOfCardsRequested:number){
    return +(totalNumberOfCardsRequested/cardsInOnePage).toPrecision(1) + 1
  }
}
