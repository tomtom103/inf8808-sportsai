import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffensiveDangerComponent } from './offensive-danger.component';

describe('OffensiveDangerComponent', () => {
  let component: OffensiveDangerComponent;
  let fixture: ComponentFixture<OffensiveDangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffensiveDangerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffensiveDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
