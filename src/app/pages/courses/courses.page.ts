import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { finalize, tap } from 'rxjs/operators';
import { Course } from 'src/app/interfaces/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  message: string;
  text: string;
  courses: Course[] = [];
  errorFromServer: string = '';
  registration: any;
  registration1: any;
  registration2: any;
  registration3: any;

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, private router: Router, private authService: AuthService, private coursesService: CoursesService) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.getAllCourses();
    console.log('entered');
}

  async getAllCourses() {
    let loading = await this.loadingCtrl.create();
    await loading.present();
    this.registration = this.coursesService.getCourses().pipe(
    finalize(() => loading.dismiss())
    )
     .subscribe(data => {
      console.log(data);
      this.courses = data;
    }, err => {
      console.log('erreur', err);
    });
  }

  deleteCourse(id: any) {
    if (id) {
      this.registration1 = this.coursesService.deleteCourseById(id).subscribe(
        (data) => {
          this.showAlert("Cours Supprimé", "Opération complétée");
          console.log(data);
          this.refresh(data);
        },
        (err) => {
          return this.handleError(err);
        }
      );
    }
  }

  refresh(data: any) {
    console.log('data', data);
    this.registration2 = this.coursesService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  handleError(error: any) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    } else {
      this.errorFromServer = `Error ${error.status} - ${error.statusText}`;
    }
  }

  logout() {
    this.message = 'Vous êtes maintenant déconnecté';
    this.registration3 = this.authService.logout().subscribe((data) => {
      this.text = 'Au revoir ';
      console.log(data);
      this.showAlert(this.text, this.message);
      this.router.navigate(['']);
    });
  }
    private showAlert(text: string, message: string) {
      this.alertCtrl
        .create({
          header: text,
          message: message,
          buttons: ['Ok']
        })
        .then(alertEl => alertEl.present());
    }

    ngOnDestroy() {
      this.registration.unsubscribe();
      this.registration1.unsubscribe();
      this.registration2.unsubscribe();
      this.registration3.unsubscribe();
      console.log('destroyed');
    }

}

