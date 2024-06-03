import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = {
    correoElectronico: '',
    contrasena: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { }

  async login() {
    this.authService.login(this.credentials).pipe(
      tap(async (response: any) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/tabs/club']);
      }),
      catchError(async (error: any) => {
        console.error('Login error', error);
        const message = error.error && error.error.message ? error.error.message : 'Ocurrió un error inesperado';
        const alert = await this.alertController.create({
          header: 'Error',
          message: message,
          buttons: ['OK']
        });
        await alert.present();
        return of(null);
      })
    ).subscribe();
  }
}
