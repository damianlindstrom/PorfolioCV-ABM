import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavBarBrandComponent } from './header-nav-bar-brand.component';

describe('HeaderNavBarBrandComponent', () => {
  let component: HeaderNavBarBrandComponent;
  let fixture: ComponentFixture<HeaderNavBarBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderNavBarBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderNavBarBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
