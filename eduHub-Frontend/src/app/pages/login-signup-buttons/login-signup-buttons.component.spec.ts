import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupButtonsComponent } from './login-signup-buttons.component';

describe('LoginSignupButtonsComponent', () => {
  let component: LoginSignupButtonsComponent;
  let fixture: ComponentFixture<LoginSignupButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSignupButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginSignupButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
