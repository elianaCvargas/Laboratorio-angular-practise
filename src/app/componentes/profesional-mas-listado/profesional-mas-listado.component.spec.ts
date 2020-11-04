import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalMasListadoComponent } from './profesional-mas-listado.component';

describe('ProfesionalMasListadoComponent', () => {
  let component: ProfesionalMasListadoComponent;
  let fixture: ComponentFixture<ProfesionalMasListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalMasListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalMasListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
