import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay, catchError, tap  } from 'rxjs/operators';

import { CARDS } from '../mock-cards';
import { Card } from '../models/Card';
import { Set } from '../models/Set';

@Injectable({
  providedIn: 'root'
})

export class CardService {
  cardUrl:string = 'https://api.pokemontcg.io/v1/cards?setCode=sm12';
  cardLimit = '?_limit=5';
  isCardSearched: boolean = false;
  codeFromSet:string

  data$:Observable<any>;
  sets$:Observable<any>;
  cardByCode$:Observable<any>;

  constructor(private http:HttpClient) {
    this.data$ = this.getCards().pipe(shareReplay(1))
    this.sets$ = this.getSets().pipe(shareReplay(1))
   }

  cardById$:Observable<any>;

  ngOninit(){
  }

  changeSearchedValue(value:boolean){
    this.isCardSearched = value;
  }

  getCards():Observable<Card[]>{
    return this.http.get<Card[]>(`${this.cardUrl}`)
  }

  getSets(){
    return this.http.get<Set[]>("https://api.pokemontcg.io/v1/sets");
  }

  getCardsByCode1(code:string){
    this.cardByCode$ = this.getCardsByCode2(code).pipe(shareReplay(1))
  }
  getCardsByCode2(code:string):Observable<any>{
    return this.http.get<any>(`https://api.pokemontcg.io/v1/cards?setCode=${code}`)
  }

  getCardById(id:string){
    this.cardById$ = this.getCardById2(id).pipe(shareReplay(1))
  }

  getCardById2(id:string):Observable<any>{
    return this.http.get(`https://api.pokemontcg.io/v1/cards/${id}`);
  }

  getHardCodedCards(){
    return CARDS;
  }

  searchCards(term: string): Observable<any>{
    if (!term.trim()){
      // if theres not a search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any>(`https://api.pokemontcg.io/v1/cards?name=${term}`).pipe(
      tap(x => x.length ?
         console.log(`found cards matching "${term}"`) :
         console.log(`no cards matching "${term}"`)),
    );
  }
}
