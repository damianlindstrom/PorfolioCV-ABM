import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenguajeModalComponent } from './lenguaje-modal.component';

describe('LenguajeModalComponent', () => {
  let component: LenguajeModalComponent;
  let fixture: ComponentFixture<LenguajeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LenguajeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LenguajeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
