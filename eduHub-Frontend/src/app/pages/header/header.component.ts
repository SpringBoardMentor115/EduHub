import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router,NavigationEnd } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone:true,
  imports:[RouterOutlet,FontAwesomeModule,CommonModule,RouterModule,HttpClientModule,ToastModule],
  providers: [MessageService]
})
export class HeaderComponent {

  

  categories: any[] = [];
  showHeader: boolean = true;

  constructor(  public authService: AuthenticationService,  
                private http: HttpClient,
                private router: Router,
                private messageService: MessageService

  ) { }

  ngOnInit(): void {
   

}
closeNavbar(): void {
  const navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse) {
    navbarCollapse.classList.remove('show');
  }
}
navigateToCourses(categoryId: number): void {
  this.router.navigate(['/courses', categoryId]); // Navigate to CoursesComponent with categoryId
}

logout(): void {
  this.authService.setLoginStatus(false);
}
logoutUser() {
  this.authService.logout();
  this.authService.setLoginStatus(false);
  this.messageService.add({key:'toast1',severity:'success', summary: 'Success', detail: 'Logged out successfully'});
  setTimeout(() => {
  this.router.navigate(['/login']);
  },2000);
}


}
