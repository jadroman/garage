import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAtServiceSearchComponent } from './car-at-service-search.component';

describe('CarAtServiceSearchComponent', () => {
  let component: CarAtServiceSearchComponent;
  let fixture: ComponentFixture<CarAtServiceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarAtServiceSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarAtServiceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
