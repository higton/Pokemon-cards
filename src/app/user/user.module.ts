import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsModule } from '../cards/cards.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ManageCardsComponent } from './manage-cards/manage-cards.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ChangeProfilePictureComponent } from './change-profile-picture/change-profile-picture.component';


@NgModule({
  declarations: [UserComponent, UserDashboardComponent, ManageCardsComponent, EditUserComponent, ChangePasswordComponent, DeleteAccountComponent, ChangeProfilePictureComponent],
  imports: [
  	CardsModule,
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
