import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { switchMap, tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Perfil {
  id: string;
  fotoPerfil: string;
  bio: string;
}

@Injectable({ providedIn: 'root' })
export class PerfilService {
  private apiUrl = `${environment.apiUrl}/perfil/1`;
  private imageApiUrl = environment.imagesUrl;
  
  private perfilSubject = new BehaviorSubject<Perfil>({
    id: '1',
    fotoPerfil: '/assets/profile/default-profile.jpg',
    bio: ''
  });
  getCurrentProfile(): Perfil {
    return this.perfilSubject.value;
  }
  
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
      tap((updatedProfile) => {
        // Forzar actualización con timestamp
        this.perfilSubject.next({
          ...updatedProfile,
          fotoPerfil: `${this.imageApiUrl}${updatedProfile.fotoPerfil}?t=${Date.now()}`
        });
      }),
      catchError(error => {
        console.error('Error en uploadImage:', error);
        return throwError(() => new Error('Error al subir la imagen'));
      })
    );
  }

  private loadProfile(): void {
    this.http.get<Perfil>(this.apiUrl).subscribe({
      next: (profile) => {
        this.perfilSubject.next({
          ...profile,
          fotoPerfil: profile.fotoPerfil.startsWith('http')
            ? profile.fotoPerfil
            : `${this.imageApiUrl}${profile.fotoPerfil}?t=${Date.now()}`
        });
      },
      error: () => this.setDefaultProfile()
    });
  }

  private setDefaultProfile(): void {
    this.perfilSubject.next({
      id: '1',
      fotoPerfil: '/assets/profile/default-profile.jpg',
      bio: ''
    });
  }

  updateProfile(updates: Partial<Perfil>): Observable<Perfil> {
    return this.http.patch<Perfil>(this.apiUrl, updates).pipe(
      tap(updatedProfile => {
        this.perfilSubject.next({
          ...updatedProfile,
          fotoPerfil: `${this.imageApiUrl}${updatedProfile.fotoPerfil}`
        });
      })
    );
  }
}