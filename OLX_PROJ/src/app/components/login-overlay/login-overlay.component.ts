import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login-overlay',
  templateUrl: './login-overlay.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login-overlay.component.css']
})
export class LoginOverlayComponent {
  public showOverlay: boolean = false;
  public guestSession: boolean = true; // Initially in guest session mode
  public username: string = '';
  public password: string = '';

  // Toggle overlay visibility
  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }

  // Handle login action
  onLogin() {
    if (this.username === 'user' && this.password === 'password') { // Example credentials
      this.guestSession = false; // Set guest session to false after login
      this.toggleOverlay(); // Close the overlay after login
    } else {
      alert('Invalid credentials');
    }
  }
}
