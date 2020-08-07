import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardDetailComponent } from '../cards/card-detail/card-detail.component'
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserComponent } from './user/user.component';
import { ManageCardsComponent } from './manage-cards/manage-cards.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ChangeProfilePictureComponent } from './change-profile-picture/change-profile-picture.component';
import { authActivate } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'profile',
    component: UserDashboardComponent,
    canActivate: [authActivate],
    children: [
      {
        path: '',
        children: [
          { path: 'card/:id', component: CardDetailComponent },
        ]
      }
    ]
  },
  {path: 'editProfile', component: EditUserComponent},
  {path: 'changeProfilePicture', component: ChangeProfilePictureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
