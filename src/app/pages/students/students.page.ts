import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Student } from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/students.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { finalize, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit, OnDestroy {
  message: string;
  text: string;
  students: Student[] = [];
  errorFromServer: string = '';
  subStudents: Subscription;
  subStudentDel: Subscription;
  subStudentsRefresh: Subscription;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private studentsService: StudentsService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getAllStudents();
    console.log('view entered');
  }

  async getAllStudents() {
    let loading = await this.loadingCtrl.create();
    await loading.present();
    this.subStudents = this.studentsService
      .getStudents()
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        (data) => {
          console.log(data);
          this.students = data;
        },
        (err) => {
          console.log('erreur', err);
        }
      );
  }

  deleteStudent(id: any) {
    if (id) {
      this.subStudentDel = this.studentsService.deleteStudentById(id).subscribe(
        (data) => {
          this.showAlert('Étudiant Supprimé', 'Opération complétée');
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
    this.subStudentsRefresh = this.studentsService
      .getStudents()
      .subscribe((data) => {
        this.students = data;
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
    if (this.subStudents) {
      this.subStudents.unsubscribe();
    } else if (this.subStudentDel) {
      this.subStudentDel.unsubscribe();
    } else if (this.subStudentsRefresh) {
      this.subStudentsRefresh.unsubscribe();
    } else {
      return false;
    }
  }
}
