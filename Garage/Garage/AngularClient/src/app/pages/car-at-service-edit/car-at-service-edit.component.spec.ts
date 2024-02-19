import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAtServiceEditComponent } from './car-at-service-edit.component';

describe('CarAtServiceEditComponent', () => {
  let component: CarAtServiceEditComponent;
  let fixture: ComponentFixture<CarAtServiceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarAtServiceEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarAtServiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
