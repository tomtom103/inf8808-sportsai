import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleChartCreationComponent } from './bubble-chart-creation.component';

describe('BubbleChartCreationComponent', () => {
  let component: BubbleChartCreationComponent;
  let fixture: ComponentFixture<BubbleChartCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BubbleChartCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleChartCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
