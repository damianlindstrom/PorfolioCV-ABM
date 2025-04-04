import { Component } from '@angular/core';
import { SoftSkillsService } from '../../services/soft-skills.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SoftSkillModalComponent } from '../../modals/soft-skill-modal/soft-skill-modal.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-soft-skills',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgbProgressbarModule],
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css']
})
export class SoftSkillsComponent {
  skills$;

  constructor(
    private skillsService: SoftSkillsService,
    private modalService: NgbModal
  ) {
    this.skills$ = this.skillsService.skills$;
  }

  abrirModalAgregar() {
    const modalRef = this.modalService.open(SoftSkillModalComponent, {
      size: 'md',
      centered: true
    });
    
    modalRef.result.then((result) => {
      if (result) this.skillsService.agregarSkill(result).subscribe();
    }).catch(() => {});
  }

  abrirModalEditar(skill: any) {
    const modalRef = this.modalService.open(SoftSkillModalComponent, {
      size: 'md',
      centered: true
    });
    
    modalRef.componentInstance.skill = { ...skill };
    modalRef.componentInstance.isEdit = true;

    modalRef.result.then((result) => {
      if (result) this.skillsService.actualizarSkill(skill.id, result).subscribe();
    }).catch(() => {});
  }

  eliminarSkill(id: number) {
    if (confirm('¿Eliminar esta habilidad?')) {
      this.skillsService.eliminarSkill(id).subscribe();
    }
  }
}