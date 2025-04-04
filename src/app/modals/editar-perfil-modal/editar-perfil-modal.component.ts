import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-perfil-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-perfil-modal.component.html',
  styleUrls: ['./editar-perfil-modal.component.css']
})
export class EditarPerfilModalComponent {
  @Input() fotoPerfilActual!: string;
  @Input() bioActual!: string;
  
  perfilForm: FormGroup;
  fotoPrevisualizacion?: string;
  archivoSeleccionado?: File;

  constructor(public activeModal: NgbActiveModal) {
    this.perfilForm = new FormGroup({
      bio: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      foto: new FormControl(null)
    });
  }

  ngOnInit() {
    this.perfilForm.patchValue({
      bio: this.bioActual
    });
    this.fotoPrevisualizacion = this.fotoPerfilActual;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.archivoSeleccionado = input.files[0];
      
      // Previsualización de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoPrevisualizacion = e.target.result;
      };
      reader.readAsDataURL(this.archivoSeleccionado);
    }
  }

  onSubmit() {
    if (this.perfilForm.valid) {
      const result = {
        bio: this.perfilForm.value.bio,
        fotoPerfil: this.archivoSeleccionado ? 
                   this.fotoPrevisualizacion : 
                   this.fotoPerfilActual
      };
      this.activeModal.close(result);
    }
  }
}