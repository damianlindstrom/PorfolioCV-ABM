import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curso-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './curso-modal.component.html',
  styleUrls: ['./curso-modal.component.css']
})
export class CursoModalComponent {
  @Input() curso: any;
  @Input() esEdicion = false;
  
  cursoForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
    this.cursoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      institucion: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    if (this.esEdicion && this.curso) {
      this.cursoForm.patchValue(this.curso);
    }
  }

  onSubmit() {
    if (this.cursoForm.valid) {
      this.activeModal.close(this.cursoForm.value);
    }
  }
}