import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { LoginSignupButtonsComponent } from '../login-signup-buttons/login-signup-buttons.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, RegistrationFormComponent, LoginComponent, LoginSignupButtonsComponent,
    HeaderComponent, FooterComponent, HomeComponent, CommonModule, ReactiveFormsModule, HttpClientModule, ToastModule, ButtonModule],
  providers: [MessageService]
})
export class RegistrationFormComponent implements OnInit {

  registrationForm!: FormGroup;
  isFormChanged: boolean = false;
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private http: HttpClient,
              private primengConfig: PrimeNGConfig,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToFormChanges();
    this.primengConfig.ripple = true;
  }

  alphanumericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[a-zA-Z0-9]*$/.test(control.value);
      return valid ? null : { alphanumeric: true };
    };
  }

  initializeForm(): void {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, this.alphanumericValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  subscribeToFormChanges(): void {
    this.registrationForm.valueChanges.subscribe(() => {
      this.isFormChanged = true;
    });
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  passwordsMatch(): boolean {
    const password = this.registrationForm.get('password')?.value;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  registerUser() {
    if (this.registrationForm.valid && this.passwordsMatch()) {
      const register = {
        userName: this.registrationForm.get('userName')?.value,
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value
      };
      this.http.post('http://localhost:8080/auth/signup', register, {responseType: 'text'}).subscribe((response: any) => {
        console.log(response);
        this.messageService.add({key: 'toast1', severity: 'success', summary: 'Registration Successful', detail: 'You have successfully registered. Please log in.'});
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);

      },
      (error) => {
        if(error.status == 500) {
          this.messageService.add({key: 'toast1', severity: 'warn', summary: 'Registration Failed', detail: 'User Already Registred'});
          console.error('User Already Registred ');
          setTimeout(() => {
          this.registrationForm.reset();
          },3000);

        }
      });
    } else {
      this.messageService.add({key: 'toast1', severity: 'warn', summary: 'Registration Failed', detail: 'Server Error'});
      console.error('Registration failed');
     
    }
  }

  navigateToSignup() {
    this.router.navigate(['/registration-form']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  toggleLogin() {
    alert('Redirecting to login form');
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
