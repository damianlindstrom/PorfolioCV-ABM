import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; 


@Component({
  selector: 'app-header-nav-bar-brand',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-nav-bar-brand.component.html',
  styleUrl: './header-nav-bar-brand.component.css'
})
export class HeaderNavBarBrandComponent {

}
