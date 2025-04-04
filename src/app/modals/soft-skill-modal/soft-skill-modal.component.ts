import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-soft-skill-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './soft-skill-modal.component.html',
  styleUrls: ['./soft-skill-modal.component.css']
})
export class SoftSkillModalComponent implements OnInit {
  @Input() skill: any = {}; // Inicializado como objeto vacío
  @Input() isEdit: boolean = false;
  
  skillForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
    this.skillForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      nivel: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)])
    });
  }

  ngOnInit(): void {
    if (this.isEdit && this.skill) {
      this.skillForm.patchValue({
        nombre: this.skill.nombre || '',
        nivel: this.skill.nivel || 50
      });
    }
  }

  onSubmit(): void {
    if (this.skillForm.valid) {
      this.activeModal.close({
        nombre: this.skillForm.value.nombre,
        nivel: Number(this.skillForm.value.nivel) // Asegurar que es número
      });
    }
  }
}