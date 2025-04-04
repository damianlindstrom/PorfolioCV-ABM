import { Component } from '@angular/core';
import { LenguajesService } from '../../services/languajes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LenguajeModalComponent } from '../../modals/lenguaje-modal/lenguaje-modal.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lenguajes',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgbProgressbarModule],
  templateUrl: './lenguajes.component.html',
  styleUrls: ['./lenguajes.component.css']
})
export class LenguajesComponent {
  lenguajes$;

  constructor(
    private lenguajesService: LenguajesService,
    private modalService: NgbModal
  ) {
    this.lenguajes$ = this.lenguajesService.lenguajes$;
  }

  abrirModalAgregar() {
    const modalRef = this.modalService.open(LenguajeModalComponent, {
      size: 'md',
      centered: true
    });
    
    modalRef.result.then((result) => {
      if (result) this.lenguajesService.agregarLenguaje(result).subscribe();
    }).catch(() => {});
  }

  abrirModalEditar(lenguaje: any) {
    const modalRef = this.modalService.open(LenguajeModalComponent, {
      size: 'md',
      centered: true
    });
    
    modalRef.componentInstance.lenguaje = lenguaje;
    modalRef.componentInstance.esEdicion = true;

    modalRef.result.then((result) => {
      if (result) this.lenguajesService.actualizarLenguaje(lenguaje.id, result).subscribe();
    }).catch(() => {});
  }

  eliminarLenguaje(id: number) {
    if (confirm('¿Eliminar este lenguaje?')) {
      this.lenguajesService.eliminarLenguaje(id).subscribe();
    }
  }
}