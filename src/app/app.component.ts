import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy{
  message: string;
  text: string;
  subLogout: Subscription;

  constructor(
    private menu: MenuController,
    private router: Router,
    private authService: AuthService,
    private platform: Platform
  ) {}

  openEnd() {
    this.menu.close();
  }

  logout() {
    this.message = 'Vous êtes maintenant déconnecté';
    this.subLogout = this.authService.logout().subscribe((data) => {
      this.text = 'Au revoir ';
      console.log(data);
      this.authService.showAlert(this.text, this.message);
      this.openEnd();
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy() {
    if(this.subLogout) {
      this.subLogout.unsubscribe();
    }
  }
}
