import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

export interface ExperienciaLaboral {
  id: number;
  jobTitle: string;
  empresa: string;
  situation: 'Independiente' | 'Relación de dependencia' | 'Freelancer';
  from: string | Date;
  to: string | Date | 'a la actualidad';
  jobDescription: string;
}

@Injectable({ providedIn: 'root' })
export class ExperienciaLaboralService extends BaseDataService<ExperienciaLaboral> {
  protected override readonly endpoint = 'experiencia';

  constructor() {
    super();
  }

  addExperiencia(experiencia: Omit<ExperienciaLaboral, 'id'>): Observable<ExperienciaLaboral> {
    return this.create(experiencia);
  }
  
  updateExperiencia(id: number, experiencia: Partial<ExperienciaLaboral>): Observable<ExperienciaLaboral> {
    // Cambiamos a PUT en lugar de PATCH para mejor compatibilidad
    return this.http.put<ExperienciaLaboral>(
      `${this.apiUrl}/${this.endpoint}/${id}`, 
      { ...experiencia, id } // Asegurarnos de incluir el ID
    ).pipe(
      tap(updated => {
        const current = this.dataSubject.value;
        const updatedData = current.map(exp => 
          exp.id === id ? { ...exp, ...updated } : exp
        );
        this.dataSubject.next(updatedData);
      })
    );
  }
  
  deleteExperiencia(id: number): Observable<void> {
    return this.delete(id);
  }

  getExperiencias$(): Observable<ExperienciaLaboral[]> {
    return this.data$;
  }
}