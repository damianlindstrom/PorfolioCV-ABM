import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './education-modal.component.html',
  styleUrls: ['./education-modal.component.css']
})
export class EducationModalComponent {
  @Input() education: any;
  @Input() isEdit = false;
  
  states = [
    { value: 'En curso', display: 'En curso' },
    { value: 'Completo', display: 'Completo' },
    { value: 'Incompleto', display: 'Incompleto' }
  ];

  educationForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
    this.educationForm = new FormGroup({
      title: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      institucion: new FormControl('', Validators.required),
      state: new FormControl(null, Validators.required) // Cambiado a null inicial
    });
  }

  ngOnInit() {
    if (this.isEdit && this.education) {
      // Asegurar compatibilidad con el formato de objeto
      const formData = {
        ...this.education,
        state: this.education.state // Mantener el valor directo
      };
      this.educationForm.patchValue(formData);
    }
  }

  toggleCurrent(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.educationForm.get('state')?.setValue(isChecked ? 'En curso' : 'Completo');
  }

  onSubmit() {
    if (this.educationForm.valid) {
      const formValue = this.educationForm.value;
      // Asegurar que 'to' tenga el valor correcto cuando está en curso
      if (formValue.state === 'En curso') {
        formValue.to = 'a la actualidad';
      }
      this.activeModal.close(formValue);
    }
  }
}