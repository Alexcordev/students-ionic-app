import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Student } from '../../interfaces/student';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.page.html',
  styleUrls: ['./create-student.page.scss'],
})
export class CreateStudentPage implements OnInit, OnDestroy {
  message: string = '';
  text: string = '';
  addStudentForm: any;
  students: Student[] = [];
  subStudent: Subscription;
  subCreateStudent: Subscription;

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.createForm();
  }

  ionViewDidEnter() {
    this.subStudent = this.studentsService.getStudents().subscribe((data) => {
      console.log(data);
      this.students = data;
    });
  }

  createForm() {
    this.addStudentForm = this.fb.group({
      surname: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
    });
  }

  createStudent() {
    if (this.addStudentForm.valid) {
      console.log(this.addStudentForm);
      this.subCreateStudent = this.studentsService.createStudent(this.addStudentForm.value).subscribe(
        (data) => this.handleSuccess(data),
        (error) => this.handleError(error)
      );
    }
  }

  handleSuccess(data: any) {
    this.showAlert('Étudiant Ajouté', 'Opération Complétée');
    console.log('OK handleSuccess - student created', data);
    this.addStudentForm.reset();
    this.studentsService.dispatchStudentCreated(data._id);
    this.router.navigate(['/home/students']);
  }

  handleError(error: any) {
    error = 'Une erreur est survenue';
    console.log('KO handleError - student NOT created', error);
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

  close() {
    this.addStudentForm.reset();
    this.router.navigate(['/home/students']);
  }

  ngOnDestroy() {
    if(this.subStudent) {
      this.subStudent.unsubscribe();
    } else if(this.subCreateStudent) {
      this.subCreateStudent.unsubscribe();
    } else {
      return false;
    }

  }
}
