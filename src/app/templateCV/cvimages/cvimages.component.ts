import { Component } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarPerfilModalComponent } from '../../modals/editar-perfil-modal/editar-perfil-modal.component';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-cvimages',
  standalone: true,
  imports: [AsyncPipe, CommonModule, NgIf],
  templateUrl: './cvimages.component.html',
  styleUrls: ['./cvimages.component.css']
})
export class CVimagesComponent {
  fotoPerfil$;
  bio$;

  constructor(
    private perfilService: PerfilService,
    private modalService: NgbModal
  ) {
    this.fotoPerfil$ = this.perfilService.fotoPerfil$;
    this.bio$ = this.perfilService.bio$;
  }

  openEditProfileModal(): void {
    const modalRef = this.modalService.open(EditarPerfilModalComponent, {
      centered: true,
      size: 'lg'
    });

    // Pasar datos actuales al modal
    this.perfilService.perfil$.subscribe(perfil => {
      modalRef.componentInstance.fotoPerfilActual = perfil.fotoPerfil;
      modalRef.componentInstance.bioActual = perfil.bio;
    });

    // Manejar resultado
    modalRef.result.then((result) => {
      if (result) {
        this.perfilService.updateProfile({
          fotoPerfil: result.fotoPerfil,
          bio: result.bio
        }).subscribe();
      }
    }).catch(() => {});
  }
}