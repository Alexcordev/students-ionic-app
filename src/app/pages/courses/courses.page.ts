import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { finalize, tap } from 'rxjs/operators';
import { Course } from 'src/app/interfaces/course';
import { StudentsService } from 'src/app/services/students.service';

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

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getAllCourses();
    console.log('entered');
  }

  async getAllCourses() {
    let loading = await this.loadingCtrl.create();
    await loading.present();
    this.registration = this.coursesService
      .getCourses()
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        (data) => {
          console.log(data);
          this.courses = data;
        },
        (err) => {
          console.log('erreur', err);
        }
      );
  }

  deleteCourse(id: any) {
    if (id) {
      let registration = this.coursesService.deleteCourseById(id).subscribe(
        (data) => {
          this.showAlert('Cours Supprimé', 'Opération complétée');
          console.log(data);
          this.refresh(data);
          registration.unsubscribe();
        },
        (err) => {
          return this.handleError(err);
        }
      );
    }
  }

  refresh(data: any) {
    console.log('data', data);
    this.coursesService.getCourses().subscribe((data) => {
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

  ionViewWillLeave() {
    this.ngOnDestroy();
  }
}
