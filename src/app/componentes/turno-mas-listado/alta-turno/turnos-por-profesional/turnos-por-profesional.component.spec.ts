import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosPorProfesionalComponent } from './turnos-por-profesional.component';

describe('TurnosPorProfesionalComponent', () => {
  let component: TurnosPorProfesionalComponent;
  let fixture: ComponentFixture<TurnosPorProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosPorProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosPorProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
