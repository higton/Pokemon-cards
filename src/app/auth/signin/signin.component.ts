import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  showErrorMessage: String;

  constructor(
    public authService: AuthService,
    public userService: UserService
  ){}

  ngOnInit(): void {
  }

  async signup(username: String, password: String) {
    this.showErrorMessage = '';

    let profileName = 'green';

    await this.authService.signup(username, password, profileName)
    .then((result:any) => {
      console.log('result', result);
      if(result.errors){
        this.showErrorMessage = this.authService.translateErrorMessage(result.errors[0].message);
      }
    })
    .catch(error =>{
     this.showErrorMessage = this.authService.translateErrorMessage(error);
    });

    this.userService.sendUpdateProfilePictureEvent();
  }
}
