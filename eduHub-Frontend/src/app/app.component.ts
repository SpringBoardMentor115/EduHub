import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginSignupButtonsComponent } from "./pages/login-signup-buttons/login-signup-buttons.component";
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, DashboardComponent, RegistrationFormComponent, LoginComponent, LoginSignupButtonsComponent,
      HeaderComponent, FooterComponent, HomeComponent,CommonModule,FontAwesomeModule
  ]  
})
export class AppComponent {

  title = 'EduHub';
  constructor(public authenticationService: AuthenticationService) { }
}
