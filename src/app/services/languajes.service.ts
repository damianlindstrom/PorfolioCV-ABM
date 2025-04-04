import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Lenguaje {
  id: number;
  nombre: string;
  nivel: number;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class LenguajesService {
  private apiUrl = 'http://localhost:3000/lenguajes';
  private lenguajesSubject = new BehaviorSubject<Lenguaje[]>([]);
  lenguajes$ = this.lenguajesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarLenguajes();
  }

  private cargarLenguajes(): void {
    this.http.get<Lenguaje[]>(this.apiUrl).subscribe({
      next: (lenguajes) => this.lenguajesSubject.next(lenguajes),
      error: (err) => console.error('Error cargando lenguajes:', err)
    });
  }

  agregarLenguaje(lenguaje: Omit<Lenguaje, 'id'>): Observable<Lenguaje> {
    return this.http.post<Lenguaje>(this.apiUrl, lenguaje).pipe(
      tap((nuevoLenguaje) => {
        const current = this.lenguajesSubject.value;
        this.lenguajesSubject.next([...current, nuevoLenguaje]);
      })
    );
  }

  actualizarLenguaje(id: number, lenguaje: Partial<Lenguaje>): Observable<Lenguaje> {
    return this.http.patch<Lenguaje>(`${this.apiUrl}/${id}`, lenguaje).pipe(
      tap((lenguajeActualizado) => {
        const current = this.lenguajesSubject.value;
        const index = current.findIndex(l => l.id === id);
        if (index !== -1) {
          const updated = [...current];
          updated[index] = { ...updated[index], ...lenguajeActualizado };
          this.lenguajesSubject.next(updated);
        }
      })
    );
  }

  eliminarLenguaje(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const current = this.lenguajesSubject.value;
        this.lenguajesSubject.next(current.filter(l => l.id !== id));
      })
    );
  }
}