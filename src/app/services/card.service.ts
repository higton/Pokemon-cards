import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map, tap } from 'rxjs/operators';

import { Card } from '../models/Card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cardUrl:string = 'https://api.pokemontcg.io/v1/cards?setCode=sm12&pageSize=50';
  cardLimit = '?_limit=5';

  constructor(private http:HttpClient) {
    this.data$ = this.getCards().pipe(shareReplay(1))
   }

  data$:Observable<any>;
  cardById$:Observable<any>;

  ngOninit(){
  }

  getCards():Observable<Card[]>{
    return this.http.get<Card[]>(`${this.cardUrl}`)
  }
  getCardById(id:string){
  this.cardById$ = this.getCardById2(id).pipe(shareReplay(1))
  }

  getCardById2(id:string):Observable<any>{
    return this.http.get(`https://api.pokemontcg.io/v1/cards/${id}`);
  }

  getHardCodedCards(){
    return [
      {
        id: "sm12-131",
        imageUrl: "https://images.pokemontcg.io/sm12/131.png",
      },
      {
        id: "sm12-132",
        imageUrl: "https://images.pokemontcg.io/sm12/132.png",
      },
      {
        id: "sm12-133",
        imageUrl: "https://images.pokemontcg.io/sm12/133.png",
      },
      {
        id: "sm12-134",
        imageUrl: "https://images.pokemontcg.io/sm12/134.png",
      },
      {
        id: "sm12-135",
        imageUrl: "https://images.pokemontcg.io/sm12/135.png",
      },
      {
        id: "sm12-136",
        imageUrl: "https://images.pokemontcg.io/sm12/136.png",
      },
      {
        id: "sm12-137",
        imageUrl: "https://images.pokemontcg.io/sm12/137.png",
      },
      {
        id: "sm12-138",
        imageUrl: "https://images.pokemontcg.io/sm12/138.png",
      },
      {
        id: "sm12-139",
        imageUrl: "https://images.pokemontcg.io/sm12/139.png",
      },
      {
        id: "sm12-140",
        imageUrl: "https://images.pokemontcg.io/sm12/140.png",
      },
      {
        id: "sm12-141",
        imageUrl: "https://images.pokemontcg.io/sm12/141.png",
      },
      {
        id: "sm12-142",
        imageUrl: "https://images.pokemontcg.io/sm12/142.png",
      },
    ];
  }
}
