import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = { id: '', email: '', password: '', token: '' };
  form: any;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  register() {
    this.submitted = true;
    this.authService.register(this.user).subscribe(
      (data) => this.registerSuccess(data),
      (error) => this.registerError(error)
    );
  }

  registerSuccess(data: User) {
    this.authService.showAlert(
      'Compte Créé avec succès',
      'Opération Complétée'
    );
    this.router.navigate(['/login']);
  }

  registerError(error: any) {
    this.authService.showAlert(
      "Une erreur s'est produite",
      'Courriel ou mot de passe invalide'
    );
    console.log('NOT registered', error);
  }
}
