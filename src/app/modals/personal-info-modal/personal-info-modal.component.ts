import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-info-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-info-modal.component.html',
  styleUrls: ['./personal-info-modal.component.css']
})
export class FormModalComponent {
  personalData: any; // Recibirá los datos del componente padre
  personalDataForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
    this.personalDataForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      domicilio: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    // Rellenar formulario si hay datos
    if (this.personalData) {
      this.personalDataForm.patchValue({
        nombre: this.personalData.nombreApplicant,
        apellido: this.personalData.apellidoApplicant,
        fechaNacimiento: this.personalData.fechaNacimientoApplicant,
        email: this.personalData.eMailApplicant,
        domicilio: this.personalData.domicilioApplicant
      });
    }
  }

  handleSubmit(): void {
    if (this.personalDataForm.valid) {
      const formData = this.personalDataForm.value;
      const transformedData = {
        nombreApplicant: formData.nombre,
        apellidoApplicant: formData.apellido,
        fechaNacimientoApplicant: formData.fechaNacimiento,
        eMailApplicant: formData.email,
        domicilioApplicant: formData.domicilio
      };

      this.activeModal.close(transformedData);
    }
  }

  onCancel(): void {
    this.activeModal.dismiss('cancel');
  }
}
