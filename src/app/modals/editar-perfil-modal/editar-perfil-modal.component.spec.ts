import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilModalComponent } from './editar-perfil-modal.component';

describe('EditarPerfilModalComponent', () => {
  let component: EditarPerfilModalComponent;
  let fixture: ComponentFixture<EditarPerfilModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPerfilModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPerfilModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
