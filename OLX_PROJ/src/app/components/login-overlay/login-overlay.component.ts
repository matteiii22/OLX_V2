import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

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
    if (this.username === 'user' && this.password === 'password') {
      // Successful login
      this.toggleOverlay(); // Close the overlay after login
      Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        text: 'Welcome, you are now logged in.'
      });
    } else {
      // Invalid credentials alert
      Swal.fire({
        icon: 'error',
        title: 'Login failed!',
        text: 'Invalid credentials. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  }
}
