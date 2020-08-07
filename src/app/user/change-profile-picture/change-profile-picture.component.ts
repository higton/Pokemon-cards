import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.css']
})
export class ChangeProfilePictureComponent implements OnInit {
  profileName: string;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.init();
  }

  async init(){
    let username = await this.authService.getUsername();
    let profileName = await this.authService.getProfileNameFromUser(username);
    let profileNumber = this.transformProfileNameToNumber(profileName[0]);
    this.selectSlide(profileNumber);
  }

  async changeProfile(profileName){
  	let username:any = await this.authService.getUsername();

  	await this.authService.changeProfileNameFromUser(username, profileName);

    this.userService.sendUpdateProfilePictureEvent();
  }

  selectSlide(number): void{
    console.log(number)

    document.documentElement.style.cssText = '--selected-item: ' + number;
    console.log('button'+number);

    for(let i = 0; i <= 3 ; i++){
      document.getElementById('button'+i).classList.remove('background-red');
    }

    document.getElementById('button'+number).classList.add('background-red');
  }

  submit(): void{
    let profileName = this.getProfileName();
    this.changeProfile(profileName);

    this.router.navigate(['/profile']);
  }

  transformProfileNumberToName(profileNumber:number): string{
    let names = ['red', 'green', 'selene', 'elio'];

    return names[profileNumber];
  }

  transformProfileNameToNumber(profileName:string): number{
    let names = ['red', 'green', 'selene', 'elio'];
    console.log('profileName', profileName);
    let tmp = 0;

    names.forEach((element, index) => {
      if(element === profileName){
        tmp = index;
      }
    });

    return tmp;
  }

  getProfileName(): string{
    let selectedItem = getComputedStyle(document.documentElement).getPropertyValue('--selected-item');
    let profileNumber = parseInt(selectedItem, 10);
    let profileName = this.transformProfileNumberToName(profileNumber);
    return profileName;
  }  
}
