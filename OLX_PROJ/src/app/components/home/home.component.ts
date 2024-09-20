import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {LoginComponent} from "../login-overlay/login-overlay.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    LoginComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
