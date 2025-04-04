import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { switchMap, tap, catchError, map } from 'rxjs/operators';

interface Perfil {
  id: string;
  fotoPerfil: string;
  bio: string;
}

@Injectable({ providedIn: 'root' })
export class PerfilService {
  private apiUrl = 'http://localhost:3000/perfil/1';
  private imageApiUrl = 'http://localhost:3001';
  private perfilSubject = new BehaviorSubject<Perfil>({
    id: '1',
    fotoPerfil: 'assets/profile/default-profile.jpg',
    bio: ''
  });
  
  perfil$ = this.perfilSubject.asObservable();
  fotoPerfil$ = this.perfil$.pipe(map(perfil => perfil.fotoPerfil));
  bio$ = this.perfil$.pipe(map(perfil => perfil.bio));

  constructor(private http: HttpClient) {
    this.loadProfile();
  }

  uploadImage(file: File): Observable<Perfil> {
    const formData = new FormData();
    formData.append('image', file);
  
    return this.http.post<{imageUrl: string, imagePath: string}>(
      `${this.imageApiUrl}/upload-profile-image`,
      formData
    ).pipe(
      switchMap(response => {
        return this.updateProfile({
          fotoPerfil: response.imagePath
        });
      }),
      catchError(error => {
        console.error('Error al subir imagen:', error);
        return throwError(() => new Error('Error al subir la imagen'));
      })
    );
  }

  updateProfile(updates: Partial<Perfil>): Observable<Perfil> {
    return this.http.patch<Perfil>(this.apiUrl, updates).pipe(
      tap(updatedProfile => {
        this.perfilSubject.next(updatedProfile);
      })
    );
  }

  private loadProfile(): void {
    this.http.get<Perfil>(this.apiUrl).subscribe({
      next: (profile) => {
        this.perfilSubject.next(profile || {
          id: '1',
          fotoPerfil: 'assets/profile/default-profile.jpg',
          bio: ''
        });
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
        // Usar valores por defecto si hay error
        this.perfilSubject.next({
          id: '1',
          fotoPerfil: 'assets/profile/default-profile.jpg',
          bio: ''
        });
      }
    });
  }
}