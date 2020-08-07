import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CardsComponent } from '../../cards/cards.module';
import { AuthService } from '../../auth/services/auth.service';
import { CardService } from '../../services/card.service';

import { Card } from '../../models/Card';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  cards:Card[];
  profileName: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private cardService: CardService,
  	) { }

  ngOnInit(): void {
    console.log('this.cards', this.cards);
    this.getProfileName();
    this.getCards();

    this.cardService.getClickEventRemoveCard().subscribe(() => {
      this.getCards();
    })
  }

  async getProfileName(){
    let username:any = await this.authService.getUsername();
    this.profileName = await this.authService.getProfileNameFromUser(username);
  }

  async getCards(){
    let username:any = await this.authService.getUsername();

    if(this.authService.user){
      let tmp:any = await this.authService.getCardsFromUser(username);
       console.log('tmp', tmp);
       if(tmp){
         tmp.forEach((card, i) => {
           tmp[i].imageUrl = this.cardService.getCardsUrl(card.card_name);
           tmp[i].id = card.card_name;
           console.log('tmp2', tmp);
         });

         this.cards = tmp;
       }
    }
  }

  gotToEditUser(){
    this.router.navigate(['/editProfile']);
  }

  setMyStyles(){
    let styles = {
      'background-image': 'url(../../../assets/profile/' + this.profileName + '-cut.png)',
    }
    return styles;
  }
}
