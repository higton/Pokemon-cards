import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Set } from 'src/app/models/Set';

@Component({
  selector: 'app-set-item',
  templateUrl: './set-item.component.html',
  styleUrls: ['./set-item.component.css']
})
export class SetItemComponent implements OnInit {
  @Input() set: Set;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    
  }

  goToCards(){
    this.router.navigate(['/sets/cards', this.set.code]);
  }
}
