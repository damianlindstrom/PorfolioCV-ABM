import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from '../../modals/personal-info-modal/personal-info-modal.component';
import { DatosPersonalesServiceService } from '../../services/datos-personales-service.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {
  personalData$;

  constructor(
    public personalInfoApplicant: DatosPersonalesServiceService,
    private modalService: NgbModal
  ) {
    this.personalData$ = this.personalInfoApplicant.personalData$;
  }

  edicionPersonalData(): void {
    const modalRef = this.modalService.open(FormModalComponent, {
      centered: true,
      size: 'lg'
    });
    
    // Pasamos los datos actuales al modal
    modalRef.componentInstance.initialData = this.personalInfoApplicant.personalCookie;

    // Manejar resultado
    modalRef.result.then((result) => {
      if (result) {
        this.personalInfoApplicant.updatePersonalData(result).subscribe();
      }
    }).catch(() => {});
  }
}