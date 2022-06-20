import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefensiveActionsComponent } from './defensive-actions.component';

describe('DefensiveActionsComponent', () => {
  let component: DefensiveActionsComponent;
  let fixture: ComponentFixture<DefensiveActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefensiveActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefensiveActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
