import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartelInputComponent } from './cartel-input-informe.component';

describe('CartelInputComponent', () => {
  let component: CartelInputComponent;
  let fixture: ComponentFixture<CartelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartelInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
