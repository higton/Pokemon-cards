import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import{
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Card } from '../../models/Card';
import { CardService } from '../../services/card.service';
import { EventEmitter } from 'protractor';


@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent implements OnInit {
  cards$: Observable<any>;
  cards: Card[];
  val: string;

  private searchTerms = new Subject<string>();
    
  constructor(
    private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  changeSearchedValue(term:string){
    console.log(term)
    if(term === ''){
      this.cardService.changeSearchedValue(false);
    }
    else this.cardService.changeSearchedValue(true);
  }

  search(term: string): void {
    this.searchTerms.next(term);

    this.changeSearchedValue(term);
  }

  ngOnInit(): void{
    this.cardService.changeSearchedValue(false);
    this.searchTerm();
    this.subscribe();
  }

  searchTerm(){
    this.cards$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if is the same as the previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) =>
      this.cardService.searchCards(term)),
    );
  }

  subscribe(){
    this.cards$.subscribe(data => {
      this.cards = data.cards;
    });
  }
}
