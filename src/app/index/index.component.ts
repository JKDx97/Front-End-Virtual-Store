import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterLink,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'], // <-- aquí es plural
  encapsulation: ViewEncapsulation.None, // <-- esto es crucial
})
export class IndexComponent implements OnInit {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  ngOnInit() {
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'true') {
      document.body.classList.add('dark-mode');
    }
  }

  toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', isDark.toString());
  }
}
