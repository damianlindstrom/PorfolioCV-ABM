import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Curso {
  id: number;
  title: string;
  institucion: string;
  from: string | Date;
  to: string | Date | 'a la actualidad';
}

@Injectable({ providedIn: 'root' })
export class CursosService {
  private apiUrl = 'http://localhost:3000/cursos';
  private cursosSubject = new BehaviorSubject<Curso[]>([]);
  cursos$ = this.cursosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarCursos();
  }

  private cargarCursos(): void {
    this.http.get<Curso[]>(this.apiUrl).subscribe({
      next: (cursos) => this.cursosSubject.next(cursos),
      error: (err) => console.error('Error cargando cursos:', err)
    });
  }

  agregarCurso(curso: Omit<Curso, 'id'>): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso).pipe(
      tap((nuevoCurso) => {
        const current = this.cursosSubject.value;
        this.cursosSubject.next([...current, nuevoCurso]);
      })
    );
  }

  actualizarCurso(id: number, curso: Partial<Curso>): Observable<Curso> {
    return this.http.patch<Curso>(`${this.apiUrl}/${id}`, curso).pipe(
      tap((cursoActualizado) => {
        const current = this.cursosSubject.value;
        const index = current.findIndex(c => c.id === id);
        if (index !== -1) {
          const updated = [...current];
          updated[index] = { ...updated[index], ...cursoActualizado };
          this.cursosSubject.next(updated);
        }
      })
    );
  }

  eliminarCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const current = this.cursosSubject.value;
        this.cursosSubject.next(current.filter(c => c.id !== id));
      })
    );
  }
}