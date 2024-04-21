import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginSignupButtonsComponent } from '../login-signup-buttons/login-signup-buttons.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports:[LoginSignupButtonsComponent,HeaderComponent,FooterComponent,HomeComponent,DashboardComponent,RegistrationFormComponent,HttpClientModule,CommonModule,ReactiveFormsModule,FontAwesomeModule]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  isLoginFormChanged: boolean = false;
  isResetPasswordFormChanged: boolean = false;
  passwordVisible: boolean = false;
  resetPasswordVisible: boolean = false;
  loginvisible: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  // password: any;
  formState: 'login' | 'reset' = 'login';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
    this.initializeResetPasswordForm();
    this.subscribeToFormChanges();
  }

  initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  initializeResetPasswordForm(): void {
    this.resetPasswordForm = this.fb.group({
      resetEmail: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get resetEmail() {
    return this.resetPasswordForm.get('resetEmail');
  }
  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }
  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }
  passwordsMatch(): boolean {
    const password = this.resetPasswordForm.get('newPassword')?.value;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  subscribeToFormChanges(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.isLoginFormChanged = true;
    });

    this.resetPasswordForm.valueChanges.subscribe(() => {
      this.isResetPasswordFormChanged = true;
    });
  }

  resetPassword(): void {
    if (this.formState === 'reset') {
      if (this.resetPasswordForm.valid) {
        let resetpassword = {
          email: this.resetPasswordForm.get('resetEmail')?.value,
          newPassword: this.resetPasswordForm.get('newPassword')?.value
        };
  
        this.http.post('http://localhost:8080/auth/reset-password', resetpassword).subscribe((response: any) => {
          console.log(response);
          this.router.navigate(['/login']);
        });
      } else {
        this.errorMessage = 'Please fill out all required fields correctly.';
      }
    }
  }
  
  
  
  loginUser(): void {
    if (this.formState === 'login') {
      if (this.loginForm.valid) {
        let login = {
          email: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value
        };
        this.http.post('http://localhost:8080/auth/login', login, { responseType: 'text' }).subscribe((response: any) => {
          console.log(response);
          this.router.navigate(['/dashboard']);
        });
      } else {
        this.errorMessage = 'Please fill out all required fields.';
      }
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  navigateToSignup() {
    this.router.navigate(['/registration-form']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  toggleFormState($event: Event): void {
    $event.preventDefault();
    this.formState = this.formState === 'login'? 'reset' : 'login';
  }

  toggleLogin() {
    alert('Redirecting to Reigistration form')
    this.router.navigate(['/registration-form']);
  }
}