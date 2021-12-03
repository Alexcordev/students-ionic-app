import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Student } from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/students.service';
import { Course } from '../../interfaces/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.page.html',
  styleUrls: ['./create-course.page.scss'],
})
export class CreateCoursePage implements OnInit {
  message: string = '';
  text: string = '';
  addCourseForm: any;
  courses: Course[] = [];
  students: Student[] = [];
  registration: any;
  registration1: any;

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
    this.registration = this.coursesService.getCourses().subscribe((data) => {
      console.log(data);
      this.courses = data;
    });
    this.registration1 = this.studentsService
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
      this.coursesService.createCourse(this.addCourseForm.value).subscribe(
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

  ngOnDestroy() {
    this.registration.unsubscribe();
    this.registration1.unsubscribe();
  }

  close() {
    this.ngOnDestroy();
    this.router.navigate(['/home/courses']);
  }

  ionViewDidLeave() {
    this.ngOnDestroy();
  }
}
