import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoMasListadoComponent } from './turno-mas-listado.component';

describe('TurnoMasListadoComponent', () => {
  let component: TurnoMasListadoComponent;
  let fixture: ComponentFixture<TurnoMasListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoMasListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoMasListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
