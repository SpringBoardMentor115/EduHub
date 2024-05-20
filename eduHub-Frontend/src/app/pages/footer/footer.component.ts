import { Component,OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  standalone:true,
  imports:[FontAwesomeModule,CommonModule]
})
export class FooterComponent {
  showFooter: boolean = true;

  constructor(private router: Router) { }

  
}
