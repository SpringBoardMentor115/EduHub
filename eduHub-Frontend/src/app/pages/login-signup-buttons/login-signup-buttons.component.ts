import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login-signup-buttons',
  templateUrl: './login-signup-buttons.component.html',
  styleUrl: './login-signup-buttons.component.css',
  standalone:true,
  imports:[]
})
export class LoginSignupButtonsComponent {
  @Output() login = new EventEmitter<void>();
  @Output() signup = new EventEmitter<void>();
  activeButton: string = ''; // To keep track of which button is active

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const currentPath = this.route.snapshot.url[0].path;
    this.activeButton = currentPath; // Set active button based on current URL
  }
}

