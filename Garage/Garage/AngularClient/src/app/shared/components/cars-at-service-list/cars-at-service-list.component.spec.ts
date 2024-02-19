import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAtServiceListComponent } from './cars-at-service-list.component';

describe('CarsAtServiceListComponent', () => {
  let component: CarsAtServiceListComponent;
  let fixture: ComponentFixture<CarsAtServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsAtServiceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarsAtServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
