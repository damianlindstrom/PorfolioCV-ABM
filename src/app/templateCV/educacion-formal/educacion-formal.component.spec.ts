import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducacionFormalComponent } from './educacion-formal.component';

describe('EducacionFormalComponent', () => {
  let component: EducacionFormalComponent;
  let fixture: ComponentFixture<EducacionFormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducacionFormalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducacionFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
