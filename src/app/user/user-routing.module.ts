import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ManageCardsComponent } from './manage-cards/manage-cards.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'cards', component: ManageCardsComponent },
          { path: '', component: UserDashboardComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
