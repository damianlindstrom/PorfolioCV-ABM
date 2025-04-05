import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface PersonalData {
  nombreApplicant: string;
  apellidoApplicant: string;
  fechaNacimientoApplicant: string;
  eMailApplicant: string;
  domicilioApplicant: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesServiceService {
  private apiUrl = `${environment.apiUrl}/datosPersonales`;
  private personalDataSubject = new BehaviorSubject<PersonalData>({
    nombreApplicant: '',
    apellidoApplicant: '',
    fechaNacimientoApplicant: '',
    eMailApplicant: '',
    domicilioApplicant: ''
  });

  personalData$ = this.personalDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarDatosPersonales();
  }

  private cargarDatosPersonales(): void {
    this.http.get<PersonalData>(this.apiUrl).subscribe({
      next: (datos) => this.personalDataSubject.next(datos),
      error: (err) => console.error('Error cargando datos personales:', err)
    });
  }

  get personalCookie() {
    return this.personalDataSubject.value;
  }

  updatePersonalData(newData: Partial<PersonalData>): Observable<PersonalData> {
    return this.http.patch<PersonalData>(this.apiUrl, newData).pipe(
      tap((datosActualizados) => {
        const currentData = this.personalDataSubject.value;
        this.personalDataSubject.next({ ...currentData, ...datosActualizados });
      })
    );
  }
}