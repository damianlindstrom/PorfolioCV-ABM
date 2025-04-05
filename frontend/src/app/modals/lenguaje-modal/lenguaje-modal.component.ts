import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lenguaje-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './lenguaje-modal.component.html',
  styleUrls: ['./lenguaje-modal.component.css']
})
export class LenguajeModalComponent {
  @Input() lenguaje: any;
  @Input() esEdicion = false;
  
  lenguajeForm: FormGroup;
  colores = ['#3178c6', '#f0db4f', '#3776ab', '#f05138', '#61dbfb', '#5ed3f3', '#e34c26'];

  constructor(public activeModal: NgbActiveModal) {
    this.lenguajeForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      nivel: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      color: new FormControl(this.colores[0], Validators.required)
    });
  }

  ngOnInit() {
    if (this.esEdicion && this.lenguaje) {
      this.lenguajeForm.patchValue(this.lenguaje);
    }
  }

  onSubmit() {
    if (this.lenguajeForm.valid) {
      this.activeModal.close(this.lenguajeForm.value);
    }
  }
}