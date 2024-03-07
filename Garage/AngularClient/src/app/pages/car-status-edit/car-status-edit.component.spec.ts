import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarStatusEditComponent } from './car-status-edit.component';

describe('CarStatusEditComponent', () => {
  let component: CarStatusEditComponent;
  let fixture: ComponentFixture<CarStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarStatusEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
