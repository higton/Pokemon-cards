import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay, catchError, tap  } from 'rxjs/operators';
import { BehaviorSubject, fromEvent } from 'rxjs';

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
  
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  data$:Observable<any>;
  sets$:Observable<any>;

  constructor(
    private http:HttpClient,
    ) {}

  ngOninit(){
  }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }

  getPageId(route:any):number{
    let id = +route.snapshot.paramMap.get('id');
    return id
  }

  getId(route:any):string{
    let id = route.snapshot.paramMap.get('id');
    return id
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
}
