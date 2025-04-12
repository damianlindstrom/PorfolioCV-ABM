import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavBarBrandComponent } from './header-nav-bar-brand/header-nav-bar-brand.component';
import { AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderNavBarBrandComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  
  ngAfterViewInit() {
    // Elimina aria-hidden del app-root
    this.elementRef.nativeElement.removeAttribute('aria-hidden');
  }

  title = 'PorfolioCV-ABM';
}

