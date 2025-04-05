import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftSkillModalComponent } from './soft-skill-modal.component';

describe('SoftSkillModalComponent', () => {
  let component: SoftSkillModalComponent;
  let fixture: ComponentFixture<SoftSkillModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftSkillModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftSkillModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
