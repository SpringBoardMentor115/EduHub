import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  standalone:true,
  imports: [RouterOutlet, DashboardComponent, RegistrationFormComponent, LoginComponent, LoginSignupButtonsComponent,
    HeaderComponent, FooterComponent, HomeComponent,CommonModule,ReactiveFormsModule,HttpClientModule
] })
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  isFormChanged: boolean = false;

  constructor(private fb:FormBuilder,private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToFormChanges();
  }

  initializeForm(): void {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
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
    return password === confirmPassword; // Use strict comparison (===)
  }

  registerUser() {
    if (this.registrationForm.valid && this.passwordsMatch()) {
      let register = {
        userName: this.registrationForm.get('userName')?.value,
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value
      };
      this.http.post('http://localhost:8080/auth/signup', register,{responseType: 'text'}).subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/login']);
      });
    } else {
      alert('Please fill out all required fields correctly and ensure passwords match.');
      console.error('Registration failed');
    }
  }
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  toggleLogin() {
    alert('Redirecting to login form')
    this.router.navigate(['/login']);
  }
}
