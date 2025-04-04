import { Component } from '@angular/core';
import { ExperienciaLaboralService } from '../../services/experiencia-laboral.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExperienciaLaboralModalComponent } from '../../modals/experiencia-laboral-modal/experiencia-laboral-modal.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { ExperienciaLaboral } from '../../services/experiencia-laboral.service';

@Component({
  selector: 'app-previous-experience',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  templateUrl: './previous-experience.component.html',
  styleUrls: ['./previous-experience.component.css']
})
export class PreviousExperienceComponent {
  experiencias$;

  constructor(
    private experienciaService: ExperienciaLaboralService,
    private modalService: NgbModal
  ) {
    this.experiencias$ = this.experienciaService.getExperiencias$()
  }

  // Método para agregar nueva experiencia
  openAddModal() {
    const modalRef = this.modalService.open(ExperienciaLaboralModalComponent, {
      size: 'lg',
      centered: true
    });
    
    modalRef.result.then((result) => {
      if (result) {
        this.experienciaService.addExperiencia(result).subscribe({
          next: (newExp) => {
            console.log('Experiencia agregada:', newExp);
            // Mostrar notificación de éxito
          },
          error: (err) => {
            console.error('Error al agregar experiencia:', err);
            // Mostrar notificación de error
          }
        });
      }
    }).catch(() => {
      // Manejo cuando se cierra el modal sin enviar datos
    });
  }

  // Método para editar experiencia existente
  openEditModal(experiencia: ExperienciaLaboral) {
    const modalRef = this.modalService.open(ExperienciaLaboralModalComponent, {
      size: 'lg',
      centered: true
    });
    
    // Pasar los datos actuales al modal
    modalRef.componentInstance.experiencia = { ...experiencia };
    modalRef.componentInstance.isEdit = true;

    modalRef.result.then((result) => {
      if (result) {
        this.experienciaService.updateExperiencia(experiencia.id, result).subscribe({
          next: (updatedExp) => {
            console.log('Experiencia actualizada:', updatedExp);
            // Mostrar notificación de éxito
          },
          error: (err) => {
            console.error('Error al actualizar experiencia:', err);
            // Mostrar notificación de error
          }
        });
      }
    }).catch(() => {
      // Manejo cuando se cierra el modal sin enviar datos
    });
  }

  // Método para eliminar experiencia
  deleteExperiencia(id: number) {
    if (confirm('¿Estás seguro de eliminar esta experiencia laboral?')) {
      this.experienciaService.deleteExperiencia(id).subscribe({
        next: () => {
          console.log('Experiencia eliminada correctamente');
          // Mostrar notificación de éxito
        },
        error: (err) => {
          console.error('Error al eliminar experiencia:', err);
          // Mostrar notificación de error
        }
      });
    }
  }
}