import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { Card } from 'src/app/models/Card';

@Component({
  selector: 'app-card-detail-attack',
  templateUrl: './card-detail-attack.component.html',
  styleUrls: ['./card-detail-attack.component.css']
})
export class CardDetailAttackComponent implements OnInit {
  @Input() card: Card;
  @Input() attack: any;
  @ViewChild('attackCost') input: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.input.nativeElement);
            // TODO: move all this logic inside a component
            for(let i=0; i < this.attack.cost.length; i++) {
              this.input.nativeElement.innerHTML += `<i class="energy ${this.attack.cost[i]}"></i>`;
            }

  }
}
