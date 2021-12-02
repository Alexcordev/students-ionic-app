import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { AlertController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private _userIsAuthenticated = false;
  baseUrl: string = "http://192.168.2.14:3000/auth";
  url: string = "http://192.168.2.14:3000/api";
  private _user = new BehaviorSubject<User>(null);
  storedUser: User;


  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user;
        } else {
          return null;
        }
      })
    );
  }

  constructor(private http: HttpClient, private alertCtrl: AlertController, public navCtrl: NavController) {

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  login(user: User) {
    console.log(user);
    //this._userIsAuthenticated = true;
    return this.http.post<User>(`${this.baseUrl}/login`, user, this.httpOptions);


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
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
    }

}