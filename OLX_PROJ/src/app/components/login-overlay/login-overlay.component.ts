import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login-overlay.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login-overlay.component.css']
})
export class LoginComponent {
  showOverlay: boolean = false;
  username: string = '';
  password: string = '';

  // Toggle the login overlay
  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }

  // Handle login action
  onLogin() {
    if (this.username && this.password) {
      // Here you can add authentication logic or any other functionality
      console.log('Login successful');
      this.toggleOverlay(); // Close the overlay after login
    } else {
      console.log('Please fill in both fields');
    }
  }
}
