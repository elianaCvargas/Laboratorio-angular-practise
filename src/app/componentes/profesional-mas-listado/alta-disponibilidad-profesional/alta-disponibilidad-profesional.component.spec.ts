import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDisponibilidadProfesionalComponent } from './alta-disponibilidad-profesional.component';

describe('AltaDisponibilidadProfesionalComponent', () => {
  let component: AltaDisponibilidadProfesionalComponent;
  let fixture: ComponentFixture<AltaDisponibilidadProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaDisponibilidadProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaDisponibilidadProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
