import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Card } from 'src/app/models/Card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  @Input() card: Card;
  cards$: Observable<Card[]>;
  
  selectedCardId: string;
  private deletedCard = new Subject<string>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CardService,
    ) { }

  ngOnInit(): void {
        console.log('card', this.card);

    this.scrollToSelectedElement();

    this.selectedCardId = this.getCardId();
    console.log(this.selectedCardId)
  }
  
  getCardId(){
    let id:string;
    this.route.params.subscribe( (params) => {
      id = params['card'];
    });
    return id;
  }
  
  scrollToSelectedElement(){
    const element = document.querySelector("#true")
    if (element) element.scrollIntoView({ block: 'end', inline: "nearest" })
  }
  
  goToDetails(){
    console.log(this.card.id);
    this.router.navigate(['./card/', this.card.id], {relativeTo: this.route});
  }

}
