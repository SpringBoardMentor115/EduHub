import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone:true,
  imports:[RouterOutlet,FontAwesomeModule]
})
export class HeaderComponent {

}
@NgModule({

  imports: [

    CommonModule,

    RouterModule

  ],

  declarations: []

})

export class HeaderModule { }