import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginSignupButtonsComponent } from './pages/login-signup-buttons/login-signup-buttons.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'registration-form', component: RegistrationFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login-signup-buttons', component: LoginSignupButtonsComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'dashboard', component: DashboardComponent }
];
@NgModule({

    imports: [RouterModule.forRoot(routes),FontAwesomeModule],
  
    exports: [RouterModule]
  
  })
  
  export class AppRoutingModule { }