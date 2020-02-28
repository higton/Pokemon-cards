import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  
  selectedId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CardService,
    ) { }

  ngOnInit(): void {
    this.scrollToSelectedElement();

    this.selectedId = this.getId();
    console.log(this.selectedId)
  }
  
  getId(){
    let id:string;
    this.route.parent.params.subscribe( (params) => {
      id = params['id'];
    });
    return id;
  }
  scrollToSelectedElement(){
    const element = document.querySelector("#true")
    if (element) element.scrollIntoView({ block: 'center', inline: "nearest" })
  }
  
  goToDetails(){
    this.router.navigate(['/sets/cards/card', this.card.id]);
  }

}
