import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user = {
    nombre: '',
    apellidos: '',
    correoElectronico: '',
    contrasena: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { }

  async register() {
    this.authService.register(this.user).pipe(
      tap(async (response: any) => {
        console.log('Registration successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      }),
      catchError(async (error: any) => {
        console.error('Registration error', error);
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
