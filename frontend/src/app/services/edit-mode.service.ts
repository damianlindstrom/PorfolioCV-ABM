import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditModeService {
  private isEditable = new BehaviorSubject<boolean>(false);
  currentMode = this.isEditable.asObservable();

  setEditMode(mode: boolean): void {
    this.isEditable.next(mode);
  }
}