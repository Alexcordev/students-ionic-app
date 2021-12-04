import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/students.service';
import { Course } from '../../interfaces/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.page.html',
  styleUrls: ['./create-course.page.scss'],
})
export class CreateCoursePage implements OnInit, OnDestroy {
  message: string = '';
  text: string = '';
  addCourseForm: any;
  courses: Course[] = [];
  students: Student[] = [];
  subCourses: Subscription;
  subStudents: Subscription;
  subCreation: Subscription;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.createForm();
  }

  ionViewDidEnter() {
    this.subCourses = this.coursesService.getCourses().subscribe((data) => {
      console.log(data);
      this.courses = data;
    });
    this.subStudents = this.studentsService
      .getStudents()
      .subscribe((data) => {
        console.log(data);
        this.students = data;
      });
  }

  createForm() {
    this.addCourseForm = this.fb.group({
      name: ['', Validators.required],
      start: ['', Validators.required],
      duration: ['', Validators.required],
      registrations: [[''], Validators.required],
    });
  }

  createCourse() {
    if (this.addCourseForm.valid) {
      console.log(this.addCourseForm);
      this.subCreation = this.coursesService.createCourse(this.addCourseForm.value).subscribe(
        (data) => this.handleSuccess(data),
        (error) => this.handleError(error)
      );
    }
  }

  handleSuccess(data: any) {
    this.showAlert('Cours Ajouté', 'Opération Complétée');
    console.log('OK handleSuccess - course created', data);
    this.addCourseForm.reset();
    this.coursesService.dispatchCourseCreated(data._id);
    this.router.navigate(['/home/courses']);
  }

  handleError(error: any) {
    error = 'Une erreur est survenue';
    console.log('KO handleError - course NOT created', error);
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
    this.addCourseForm.reset();
    this.router.navigate(['/home/courses']);
  }

  ngOnDestroy() {
    if(this.subCourses) {
      this.subCourses.unsubscribe();
    } else if(this.subStudents) {
      this.subStudents.unsubscribe();
    } else if(this.subCreation) {
      this.subCreation.unsubscribe();
    } else {
      return false;
    }
  }
}
