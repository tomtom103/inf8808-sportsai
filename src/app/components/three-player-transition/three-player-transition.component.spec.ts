import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreePlayerTransitionComponent } from './three-player-transition.component';

describe('ThreePlayerTransitionComponent', () => {
  let component: ThreePlayerTransitionComponent;
  let fixture: ComponentFixture<ThreePlayerTransitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreePlayerTransitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreePlayerTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
