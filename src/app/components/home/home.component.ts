import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { filter, map, mergeMap, switchMap, concatMap } from 'rxjs/operators';

import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public cardService:CardService,
  ) { }

  ngOnInit(): void {


    const switched = of(2, 2, 3).pipe(switchMap((x: number) => of(x, x ** 2, x ** 3)));
    switched.subscribe(x => console.log(x));
  }
}
