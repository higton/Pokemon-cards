import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailAttackComponent } from './card-detail-attack.component';

describe('CardDetailAttackComponent', () => {
  let component: CardDetailAttackComponent;
  let fixture: ComponentFixture<CardDetailAttackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDetailAttackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
