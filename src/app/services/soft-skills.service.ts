import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface SoftSkill {
  id: number;
  nombre: string;
  nivel: number;
}

@Injectable({ providedIn: 'root' })
export class SoftSkillsService {
  private apiUrl = 'http://localhost:3000/softSkills';
  private skillsSubject = new BehaviorSubject<SoftSkill[]>([]);
  skills$ = this.skillsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarSkills();
  }

  private cargarSkills(): void {
    this.http.get<SoftSkill[]>(this.apiUrl).subscribe({
      next: (skills) => this.skillsSubject.next(skills),
      error: (err) => console.error('Error cargando soft skills:', err)
    });
  }

  agregarSkill(skill: Omit<SoftSkill, 'id'>): Observable<SoftSkill> {
    return this.http.post<SoftSkill>(this.apiUrl, skill).pipe(
      tap((nuevaSkill) => {
        const current = this.skillsSubject.value;
        this.skillsSubject.next([...current, nuevaSkill]);
      })
    );
  }

  actualizarSkill(id: number, skill: Partial<SoftSkill>): Observable<SoftSkill> {
    return this.http.patch<SoftSkill>(`${this.apiUrl}/${id}`, skill).pipe(
      tap((skillActualizada) => {
        const current = this.skillsSubject.value;
        const index = current.findIndex(s => s.id === id);
        if (index !== -1) {
          const updated = [...current];
          updated[index] = { ...updated[index], ...skillActualizada };
          this.skillsSubject.next(updated);
        }
      })
    );
  }

  eliminarSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const current = this.skillsSubject.value;
        this.skillsSubject.next(current.filter(s => s.id !== id));
      })
    );
  }
}