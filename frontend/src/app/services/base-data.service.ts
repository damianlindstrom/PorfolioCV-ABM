import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseDataService<T extends { id?: number }> {
  protected http = inject(HttpClient);
  protected apiUrl = environment.apiUrl;
  protected abstract readonly endpoint: string;

  protected dataSubject = new BehaviorSubject<T[]>([]);
  public data$ = this.dataSubject.asObservable();

  constructor() {
    setTimeout(() => this.loadInitialData(), 0);
  }

  protected loadInitialData(): void {
    this.getAll().subscribe();
  }

  protected getAll(): Observable<T[]> {
    if (!this.endpoint) {
      console.error('Endpoint no está definido');
      return of([]);
    }
    
    const url = `${this.apiUrl}/${this.endpoint}`;
    console.log('Realizando GET a:', url); // Debug
    
    return this.http.get<T[]>(url).pipe(
      tap(data => {
        console.log('Datos recibidos:', data);
        this.dataSubject.next(data);
      }),
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return of([]);
      })
    );
  }

  protected saveChanges(data: T[]): Observable<boolean> {
    this.dataSubject.next(data);
    return of(true);
  }

  protected create(item: Omit<T, 'id'>): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${this.endpoint}`, item).pipe(
      tap(newItem => {
        const current = this.dataSubject.value;
        this.dataSubject.next([...current, newItem]);
      })
    );
  }
  
  protected update(id: number, item: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${this.endpoint}/${id}`, item).pipe(
      tap(updatedItem => {
        const current = this.dataSubject.value;
        const updated = current.map(i => i.id === id ? {...i, ...updatedItem} : i);
        this.dataSubject.next(updated);
      })
    );
  }
  
  protected delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.endpoint}/${id}`).pipe(
      tap(() => {
        const current = this.dataSubject.value;
        this.dataSubject.next(current.filter(i => i.id !== id));
      })
    );
  }
  protected generateId(items: T[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id || 0)) + 1 : 1;
  }
}