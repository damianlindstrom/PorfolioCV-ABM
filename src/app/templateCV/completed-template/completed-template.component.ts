import { Component } from '@angular/core';
import { CVimagesComponent } from '../cvimages/cvimages.component';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { EducationComponent } from '../education/education.component';
import { EducacionFormalComponent } from '../educacion-formal/educacion-formal.component';
import { PreviousExperienceComponent } from '../previous-experience/previous-experience.component';
import { SoftSkillsComponent } from '../soft-skills/soft-skills.component';
import { LenguajesComponent } from '../lenguajes/lenguajes.component';

@Component({
  selector: 'app-completed-template',
  imports: [CVimagesComponent, PersonalInfoComponent, EducationComponent, EducacionFormalComponent, PreviousExperienceComponent, SoftSkillsComponent, LenguajesComponent],
  templateUrl: './completed-template.component.html',
  styleUrl: './completed-template.component.css'
})
export class CompletedTemplateComponent {

}
