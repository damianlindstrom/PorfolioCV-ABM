import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CompletedTemplateComponent } from './templateCV/completed-template/completed-template.component';
import { CvEstaticoComponent } from './cv-estatico/cv-estatico.component';
export const routes: Routes = [
  { 
    path: '', 
    component: LandingPageComponent, 
    title: 'Inicio' 
  },
  { 
    path: 'mi-cv', 
    component: CvEstaticoComponent,
    title: 'CV Resumido'
  },
  { 
    path: 'mi-proyecto-editable', 
    component: CompletedTemplateComponent,
    title: 'ABM-ProyectoAngular'
  },
  { 
    path: '**', 
    redirectTo: ''  // Redirige a la landing si la ruta no existe
  }
];