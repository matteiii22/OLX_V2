import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-login-overlay',
  templateUrl: './login-overlay.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,

  ],
  styleUrls: ['./login-overlay.component.css']
})
export class LoginOverlayComponent {
  public showOverlay: boolean = false;
  public guestSession: boolean = true; // Initially in guest session mode
  public username: string = '';
  public password: string = '';
  constructor(
    private http: HttpClient,
  ) {}

  // Toggle overlay visibility
  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
    if (!this.showOverlay) {
      this.username = '';
      this.password = '';
    }
  }
  onLogin() {
    // Verificare câmpuri goale
    if (!this.username || !this.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenție!',
        text: 'Te rugăm să completezi toate câmpurile!',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Loading state
    Swal.fire({
      title: 'Se procesează...',
      html: 'Te rugăm să aștepți...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.http.post('/api/login', {
      username: this.username,
      password: this.password
    }).subscribe(
      (response: any) => {
        if (response.success) {
          localStorage.setItem('token', response.token);

          Swal.fire({
            icon: 'success',
            title: 'Succes!',
            text: 'Autentificare reușită!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.toggleOverlay();
            // Aici poți adăuga redirect sau alte acțiuni post-login
          });
        }
      },
        (error: { status: number; }) => {
        let errorMessage = 'A apărut o eroare la autentificare!';

        if (error.status === 401) {
          errorMessage = 'Username sau parolă incorecte!';
        } else if (error.status === 503) {
          errorMessage = 'Serviciul nu este disponibil momentan!';
        }

        Swal.fire({
          icon: 'error',
          title: 'Eroare!',
          text: errorMessage,
          confirmButtonText: 'Încearcă din nou'
        });
      }
    );
  }


}


