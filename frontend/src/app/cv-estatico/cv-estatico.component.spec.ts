import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvEstaticoComponent } from './cv-estatico.component';

describe('CvEstaticoComponent', () => {
  let component: CvEstaticoComponent;
  let fixture: ComponentFixture<CvEstaticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvEstaticoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvEstaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
