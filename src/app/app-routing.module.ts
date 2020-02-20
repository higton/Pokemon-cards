import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';


const routes: Routes = [
  { path: 'cards/:id', component: CardDetailComponent},
  { path: 'cards', component: CardsComponent},
  { path: '', component: LoginComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
