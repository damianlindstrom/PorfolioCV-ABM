import { Component } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarPerfilModalComponent } from '../../modals/editar-perfil-modal/editar-perfil-modal.component';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { take } from 'rxjs/operators';
import { EditModeService } from '../../services/edit-mode.service';

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
  timestamp = Date.now();

  constructor(
    private perfilService: PerfilService,
    private modalService: NgbModal,
  
  ) {
    this.fotoPerfil$ = this.perfilService.fotoPerfil$
    this.bio$ = this.perfilService.bio$
  }

  openEditProfileModal(): void {
    const modalRef = this.modalService.open(EditarPerfilModalComponent, {
      centered: true,
      size: 'lg'
    });

    // Pasar datos actuales al modal
    this.perfilService.perfil$.pipe(take(1)).subscribe(perfil => {
      modalRef.componentInstance.fotoPerfilActual = perfil.fotoPerfil;
      modalRef.componentInstance.bioActual = perfil.bio;
    });

    // Manejar resultado del modal
    modalRef.result.then((result) => {
      if (result) {
        if (result.fotoFile) {
          // Si hay nueva imagen, subirla primero
          this.perfilService.uploadImage(result.fotoFile).subscribe({
            next: () => {
              this.timestamp = Date.now(); // Actualizar timestamp para forzar recarga
              // Actualizar bio si es diferente
              const currentBio = this.perfilService.getCurrentProfile().bio;
              if (result.bio && result.bio !== currentBio ) {
                this.perfilService.updateProfile({ bio: result.bio }).subscribe();
              }
            },
            error: (err) => console.error('Error al subir imagen:', err)
          });
        } else if (result.bio) {
          // Si solo hay cambios en la bio
          this.perfilService.updateProfile({ bio: result.bio }).subscribe();
        }
      }
    }).catch(() => {});
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/profile/default-profile.jpg';
  }
}