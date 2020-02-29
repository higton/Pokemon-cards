import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay, catchError, tap  } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Card } from '../models/Card';
import { Set } from '../models/Set';

@Injectable({
  providedIn: 'root'
})

export class CardService {
  cardUrl:string = 'https://api.pokemontcg.io/v1/';
  isCardSearched: boolean = false;
  codeFromSet:string
  pageId:number
  numberOfPages:number
  
  data$:Observable<any>;
  sets$:Observable<any>;

  constructor(
    private http:HttpClient,
    private route: ActivatedRoute,
    ) {
}

  ngOninit(){

  }

  changeSearchedValue(value:boolean){
    this.isCardSearched = value;
  }

  getAllCards(pageId:number):Observable<any>{
    return this.http.get<any>(`${this.cardUrl}cards?page=${pageId}`)
  }

  getResponseAllCards(pageId:number){
    return this.http.get<any>(
      `${this.cardUrl}cards`, {observe: 'response'})
      .pipe(shareReplay(1))
  }

  getSets():Observable<any>{
    return this.http.get<Set[]>("https://api.pokemontcg.io/v1/sets");
  }

  getCardsById(pageId:number, code:string){
    return this.http.get<any>(
      `https://api.pokemontcg.io/v1/cards?setCode=${code}&page=${pageId}&pageSize=50`)
      .pipe(shareReplay(1))
  }
  
  getResponseCardsById(pageId:number, code:string){
    return this.http.get<any>(
      `https://api.pokemontcg.io/v1/cards?setCode=${code}&page=${pageId}&pageSize=50`, {observe: 'response'})
      .pipe(shareReplay(1))
  }
  
  getCardById(id:string):Observable<any>{
    return this.http.get(
      `https://api.pokemontcg.io/v1/cards/${id}`)
      .pipe(shareReplay(1))
  }

  searchCards(term: string): Observable<any>{
    if (!term.trim()){
      // if theres not a search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any>(`https://api.pokemontcg.io/v1/cards?name=${term}`)
  }

  getPageId():number{
    let id = +this.route.snapshot.paramMap.get('id');
    return id
  }
}
