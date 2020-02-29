import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
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
}
