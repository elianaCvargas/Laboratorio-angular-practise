import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyLayoutAltaActorComponent } from './empty-layout-alta-actor.component';

describe('EmptyLayoutAltaActorComponent', () => {
  let component: EmptyLayoutAltaActorComponent;
  let fixture: ComponentFixture<EmptyLayoutAltaActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyLayoutAltaActorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyLayoutAltaActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
