import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVimagesComponent } from './cvimages.component';

describe('CVimagesComponent', () => {
  let component: CVimagesComponent;
  let fixture: ComponentFixture<CVimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CVimagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CVimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
