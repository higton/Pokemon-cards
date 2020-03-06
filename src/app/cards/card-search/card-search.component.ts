import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import{ switchMap } from 'rxjs/operators';

import { Card } from '../../models/Card';
import { CardService } from '../../services/card.service';


@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent implements OnInit {
  cards$: Observable<any>;
  cards: Card[];
  val: string;
  message:any;

  private searchTerms = new Subject<string>();
    
  constructor(
    private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void{
    this.cardService.currentMessage.subscribe(message => this.message = message)

    this.cardService.changeSearchedValue(false);
    this.searchTerm();
    this.subscribe();
  }
  
  changeSearchedValue(term:string){
    if(term === ''){
      this.cardService.changeSearchedValue(false);
    }
    else this.cardService.changeSearchedValue(true);
  }
  
  searchTerm(){
    this.cards$ = this.searchTerms.pipe(
      // switch to new search observable each time the term changes
      switchMap((term: string) =>
      this.cardService.searchCards(term)),
    );
  }

  subscribe(){
    this.cards$.subscribe(data => {
      this.cards = data.cards;
      this.goToSearchPage();
      console.log(this.cards);
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);

    this.changeSearchedValue(term);
  }

  goToSearchPage(){
    this.router.navigateByUrl('search', { state: {cards: this.cards} });
    this.cardService.changeMessage(this.cards)
  } 
}
