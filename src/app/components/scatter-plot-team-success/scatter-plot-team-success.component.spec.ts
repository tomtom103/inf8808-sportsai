import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterPlotTeamSuccessComponent } from './scatter-plot-team-success.component';

describe('ScatterPlotTeamSuccessComponent', () => {
  let component: ScatterPlotTeamSuccessComponent;
  let fixture: ComponentFixture<ScatterPlotTeamSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterPlotTeamSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterPlotTeamSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
