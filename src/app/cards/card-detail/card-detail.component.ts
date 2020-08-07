import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { ServerService } from '../../auth/services/server.service';
import { Card } from 'src/app/models/Card';
import { CardService } from '../../services/card.service';
import { element } from 'protractor';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
  card: Card;
  isCardCollectedFromUser: any;

  constructor(
    public authService: AuthService,
    public server: ServerService,
    private cardService:CardService,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit(): void {
    console.log('card-detail.component init')
    this.getIdToSubscribe();
  }

  async getIdToSubscribe(){
    let username:any = '';
    username = await this.authService.getUsername();

    let id = this.route.snapshot.paramMap.get('id');

    this.cardService.getCardById(id).subscribe( 
      async (data) => {
        this.card = data.card;
        console.log('this.card', this.card)
        this.card.types = this.card.types ?? [''];
        this.card.weaknesses = this.card.weaknesses ?? [{value: ''}];
        this.card.retreatCost = this.card.retreatCost ?? [''];

        this.isCardCollectedFromUser = await this.authService.isCardCollectedFromUser(
          username,
          this.card.id
        );
      });
  }

  displayPokemonTypeImage(card: Card){
    let element = document.getElementById("pokemon-type");

    console.log('this.card.types[0]', this.card.types[0])
    if(this.card.types[0] !== ''){
      element.className = `energy ${this.card.types[0]}`;
    }
  }

  displayPokemonWeaknessImage(card: Card) {
    let element = document.getElementById("pokemon-weakness");

    console.log(this.card.types[0])
    if(this.card.weaknesses[0].value !== ''){
      element.className = `energy ${this.card.weaknesses[0]}`;
    }
  }

  displayPokemonRetreatCostImage(card: Card) {
    // Place an image for each retreat cost
    let element = document.getElementById("pokemon-retreat-cost");
    console.log('this.card.retreatCost.length', this.card.retreatCost.length);
    for(let i=0; this.card.retreatCost[0] !== '' && i < this.card.retreatCost.length; i++) {
      element.innerHTML += `<i class="energy ${this.card.retreatCost[i]}"></i>`;
    }

    this.card.retreatCost = [''];
  }

  goBackToCards(){
    console.log(this.cardService.codeFromSet)
    if(this.cardService.isCardSearched){
      this.router.navigate(['/home']);
    }
    else{
      console.log(this.cardService.pageId)
      this.router.navigate([`../../`, {card: this.card.id}], {relativeTo: this.route});
   }
  }

  async addCardToUser(){
    let username:any = await this.authService.getUsername();
    let cardName = this.card.id;
    
    this.authService.addCardToUser(username, cardName)
    .then((result) => {
      this.isCardCollectedFromUser = true;
    });
  }

  async removeCardFromUser(){
    let username:any = await this.authService.getUsername();
    let cardName = this.card.id;
    
    this.cardService.sendRemoveCardClickEvent();
    this.authService.removeCardFromUser(username, cardName)
    .then((result) => {
      this.isCardCollectedFromUser = false;
    });
  }
}
