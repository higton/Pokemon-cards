import { Component, OnInit } from '@angular/core';

import { CardService } from '../../services/card.service';
import { Set } from '../../models/Set';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  sets: Set[];
  
  constructor(
    private cardService:CardService,
  ) { }

  ngOnInit(): void {
    this.sendGetRequest();
  }

  sendGetRequest(){
    this.cardService.getSets().subscribe(data => {
      this.sets = data.sets.reverse();
      console.log(data);
    });
  }

}
