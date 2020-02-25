import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ManageCardsComponent } from './manage-cards/manage-cards.component';


@NgModule({
  declarations: [UserComponent, UserDashboardComponent, ManageCardsComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
