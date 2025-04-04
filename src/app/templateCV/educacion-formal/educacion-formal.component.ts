import { Component } from '@angular/core';
import { EducacionFormalService } from '../../services/educacion-formal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EducationModalComponent } from '../../modals/education-modal/education-modal.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { EducationItem } from '../../services/educacion-formal.service';
@Component({
  selector: 'app-educacion-formal',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  templateUrl: './educacion-formal.component.html',
  styleUrls: ['./educacion-formal.component.css'],
})
export class EducacionFormalComponent {
  educaciones$;

  constructor(
    private educacionService: EducacionFormalService,
    private modalService: NgbModal
  ) {
    this.educaciones$ = this.educacionService.getEducacion()
  }

  openAddModal() {
    const modalRef = this.modalService.open(EducationModalComponent, {
      size: 'lg',
      centered: true
    });
    
    modalRef.result.then((result) => {
      if (result) {
        this.educacionService.addEducation(result).subscribe({
          next: (newItem) => console.log('Agregado:', newItem),
          error: (err) => console.error('Error al agregar:', err)
        });
      }
    }).catch(() => {});
  }

  openEditModal(education: EducationItem) {
    const modalRef = this.modalService.open(EducationModalComponent, {
      size: 'lg',
      centered: true
    });
    
    modalRef.componentInstance.education = education;
    modalRef.componentInstance.isEdit = true;

    modalRef.result.then((result) => {
      if (result && education.id) {
        this.educacionService.updateEducation(education.id, result).subscribe({
          next: (updated) => console.log('Actualizado:', updated),
          error: (err) => console.error('Error al actualizar:', err)
        });
      }
    }).catch(() => {});
  }

  deleteEducation(id: number | undefined) {
    if (!id) return;
    
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      this.educacionService.deleteEducation(id).subscribe({
        next: () => console.log('Eliminado correctamente'),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
}