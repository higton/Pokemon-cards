import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CardSearchComponent } from '../../../cards/cards.module';
import { ServerService } from '../../../auth/services/server.service';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileName: string = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public server: ServerService,
    public authService: AuthService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.init();

    this.userService.getUpdateProfilePictureEvent().subscribe(() => {
      this.init();
    });
  }

  async init(){
    console.log('passouaki11111111');

    let username:any = await this.authService.getUsername();

    if(username === null){
      this.profileName = null;
    }

    await this.authService.getProfileNameFromUser(username)
    .then(result => this.profileName = result)
    .catch(err => console.log(err));

    this.updateProfileImage(this.profileName);
  }

  goToHomePage(){
    this.router.navigate(['/home']);
  }

  goToSetsPage(){
    this.router.navigate(['/sets']);
  }

  goToAllCardsPage(){
    this.router.navigate(['/cards/page/1']);
  }

  goToLoginPage(){
    this.router.navigate(['/login']);
  }

  goToSignUpPage(){
    this.router.navigate(['/signup']);
  }

  goToProfilePage(){
    this.router.navigate(['/profile']);
  }

  async logout(){
    await this.authService.logout();
    this.userService.sendUpdateProfilePictureEvent();
  }

  updateProfileImage(profileName: string){
    console.log('profileName',profileName);
    if(profileName !== null){
      document.getElementById('profile').classList.remove('no-profile');

      document.getElementById('profile').style.backgroundImage = 'url(../../../assets/profile/' + this.profileName + '-cut.png)' 
    } else {
      document.getElementById('profile').classList.add('no-profile');
      document.getElementById('profile').style.backgroundImage = 'url(../../../../assets/profile/profile-icon.png)';
    }
  }
}
