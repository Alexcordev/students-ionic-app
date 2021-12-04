import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { AlertController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = '/auth';
  url: string = '/api';
  private _user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    public navCtrl: NavController
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  login(user: User) {
    console.log(user);
    return this.http.post<User>(
      `${this.baseUrl}/login`,
      user,
      this.httpOptions
    );
  }

  register(user: User) {
    console.log(user);
    return this.http.post<User>(
      `${this.baseUrl}/register`,
      user,
      this.httpOptions
    );
  }

  getusername() {
    return this.http.get(`${this.baseUrl}/username`);
  }

  logout() {
    return this.http.get(`${this.baseUrl}/logout`);
  }

  showAlert(text: string, message: string) {
    this.alertCtrl
      .create({
        header: text,
        message: message,
        buttons: ['Ok'],
      })
      .then((alertEl) => alertEl.present());
  }
}
