import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/models/Card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  @Input() card: Card;
  
  constructor(private router: Router) { 
    console.log(this.card)
    if(this.card === undefined){
      console.log('okidoki');
    }

  }

  ngOnInit(): void {
  }

  goToDetails(){
    this.router.navigate(['/cards', this.card.id]);
  }

}
