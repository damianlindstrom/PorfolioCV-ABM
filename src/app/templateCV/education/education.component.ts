import { Component } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CursoModalComponent } from '../../modals/curso-modal/curso-modal.component';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  cursos$;

  constructor(
    private cursosService: CursosService,
    private modalService: NgbModal
  ) {
    this.cursos$ = this.cursosService.cursos$;
  }

  abrirModalAgregar() {
    const modalRef = this.modalService.open(CursoModalComponent, {
      size: 'lg',
      centered: true
    });
    
    modalRef.result.then((result) => {
      if (result) this.cursosService.agregarCurso(result).subscribe();
    }).catch(() => {});
  }

  abrirModalEditar(curso: any) {
    const modalRef = this.modalService.open(CursoModalComponent, {
      size: 'lg',
      centered: true
    });
    
    modalRef.componentInstance.curso = curso;
    modalRef.componentInstance.esEdicion = true;

    modalRef.result.then((result) => {
      if (result) this.cursosService.actualizarCurso(curso.id, result).subscribe();
    }).catch(() => {});
  }

  eliminarCurso(id: number) {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this.cursosService.eliminarCurso(id).subscribe();
    }
  }
}