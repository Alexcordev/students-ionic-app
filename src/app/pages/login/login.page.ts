import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = { id: '', email: '', password: '', token: '' };
  message: string;
  text: string;
  value: any;
  isLoading = false;
  isLogin = true;
  storedData: any;
  userInfo = null;
  registration: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {}

  async ngOnInit() {}

  login() {
    let authObs: Observable<any>;
    this.registration = authObs = this.authService.login(this.user);
    authObs.subscribe(
      (data) => this.loginSuccess(data),
      (error) => this.loginError(error)
    );
  }

  loginSuccess(data) {
    console.log(data, 'data');
    if (this.platform.is('ios')) {
      this.router.navigate(['/home/students/', JSON.stringify(data)]);
      this.text = 'Bienvenue';
      this.message = 'Vous êtes connecté';
      this.showAlert(this.text, this.message);
      console.log('running on iOS device!');
    }
    if (this.platform.is('android')) {
      console.log(data, 'data');
      console.log('running on android device');
      console.log(this.storedData, 'storedData');
      this.router.navigate(['/home/students/', JSON.stringify(data)]);
      this.text = 'Bienvenue';
      this.message = 'Vous êtes connecté';
      this.showAlert(this.text, this.message);
    }
    if (this.platform.is('desktop')) {
      console.log(data, 'data in web platform');
      this.router.navigate(['/home/students/', JSON.stringify(data)]);
      console.log(this.storedData);
      this.text = 'Bienvenue ';
      this.message = 'Vous êtes connecté';
      this.showAlert(this.text, this.message);
    }
  }
  loginError(error) {
    console.log('NOT logged in', error);
    this.message = "L'authentification a échoué";
    this.text = 'Une erreur est survenue';
    this.showAlert(this.text, this.message);
  }

  private showAlert(text: string, message: string) {
    this.alertCtrl
      .create({
        header: text,
        message: message,
        buttons: ['Ok'],
      })
      .then((alertEl) => alertEl.present());
  }

  ngOnDestroy() {
    this.registration.unsubscribe();
    console.log('destroyed');
  }
}
