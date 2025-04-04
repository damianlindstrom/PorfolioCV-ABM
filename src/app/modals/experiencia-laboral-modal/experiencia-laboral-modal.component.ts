import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experiencia-laboral-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './experiencia-laboral-modal.component.html',
  styleUrls: ['./experiencia-laboral-modal.component.css']
})
export class ExperienciaLaboralModalComponent {
  @Input() experiencia: any;
  @Input() isEdit = false;
  
  situaciones = ['Independiente', 'Relación de dependencia', 'Freelancer'];
  experienciaForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
    this.experienciaForm = new FormGroup({
      jobTitle: new FormControl('', Validators.required),
      empresa: new FormControl('', Validators.required),
      situation: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      jobDescription: new FormControl('', Validators.required)
    });

    // Manejar cambios en el estado
    this.experienciaForm.get('situation')?.valueChanges.subscribe(val => {
      if (val === 'En curso') {
        this.experienciaForm.get('to')?.setValue('a la actualidad');
        this.experienciaForm.get('to')?.disable();
      } else {
        this.experienciaForm.get('to')?.enable();
      }
    });
  }

  // Método para manejar el checkbox "En curso"
  toggleCurrent(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.experienciaForm.get('situation')?.setValue(isChecked ? 'En curso' : 'Completo');
  }

  ngOnInit() {
    if (this.isEdit && this.experiencia) {
      this.experienciaForm.patchValue(this.experiencia);
      if (this.experiencia.situation === 'En curso') {
        this.experienciaForm.get('to')?.disable();
      }
    }
  }

  onSubmit() {
    if (this.experienciaForm.valid) {
      const formValue = this.experienciaForm.value;
      // Asegurar que 'to' tenga el valor correcto cuando está en curso
      if (formValue.situation === 'En curso') {
        formValue.to = 'a la actualidad';
      }
      this.activeModal.close(formValue);
    }
  }
}