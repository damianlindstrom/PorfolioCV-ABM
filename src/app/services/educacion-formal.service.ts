import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from './base-data.service';

export interface EducationItem {
  id: number;
  title: string;
  from: string | Date;
  to: string | Date | 'a la actualidad';
  institucion: string;
  state: 'En curso' | 'Completo' | 'Incompleto';
}

@Injectable({ 
  providedIn: 'root' 
})
export class EducacionFormalService extends BaseDataService<EducationItem> {
  protected override readonly endpoint = 'educacion';
  
  constructor() {
    super();
    console.log('Servicio de educación inicializado'); // Debug
  }

  addEducation(educacion: Omit<EducationItem, 'id'>): Observable<EducationItem> {
    return this.create(educacion as any);
  }

  updateEducation(id: number, education: Partial<EducationItem>): Observable<EducationItem> {
    return this.update(id, education);
  }

  deleteEducation(id: number): Observable<void> {
    return this.delete(id);
  }

  getEducacion(): Observable<EducationItem[]> {
    return this.data$;
  }
}