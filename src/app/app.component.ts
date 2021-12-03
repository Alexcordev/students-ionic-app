import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { AuthService } from '../../src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  message: string;
  text: string;
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
    this.authService.logout().subscribe((data) => {
      this.text = 'Au revoir ';
      console.log(data);
      this.authService.showAlert(this.text, this.message);
      this.openEnd();
      this.router.navigate(['/login']);
    });
  }
}
