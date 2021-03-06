import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CoursesService } from '../../services/courses.service';
import { StudentsService } from '../../services/students.service';
import { AlertController } from '@ionic/angular';
import { Course } from 'src/app/interfaces/course';
import { Student } from 'src/app/interfaces/student';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.page.html',
  styleUrls: ['./update-course.page.scss'],
})
export class UpdateCoursePage implements OnInit, OnDestroy{
  updateCourseForm: any;
  courseId: any = '';
  course: Course;
  students: Student[] = [];
  message: string = '';
  text: string = '';
  errorFromServer = '';
  subCourse: Subscription;
  subStudents: Subscription;
  subUpdate: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.subCourse = this.coursesService
      .getCourseById(this.courseId)
      .subscribe(
        (data) => {
          this.course = data;
          this.createForm();
          console.log(this.course);
        },
        (error) => console.error(error)
      );

    this.subStudents = this.studentsService.getStudents().subscribe(
      (data) => {
        this.students = data;
        console.log(this.students);
      },
      (error) => console.error(error)
    );
    console.log('View entered');
  }

  createForm() {
    this.updateCourseForm = this.fb.group({
      name: this.course.name,
      start: this.course.start,
      duration: this.course.duration,
      registrations: [this.course.registrations],
    });
  }
  updateCourse(formDirective: FormGroupDirective) {
    if (this.updateCourseForm.valid) {
      console.log(this.updateCourseForm);
      this.subUpdate = this.coursesService
        .updateCourseById(this.courseId, this.updateCourseForm.value)
        .subscribe(
          (data) => this.handleSuccess(data, formDirective),
          (error) => this.handleError(error)
        );
    }
  }
  handleSuccess(data: any, formDirective: FormGroupDirective) {
    this.showAlert('Cours mis ?? jour', 'Op??ration compl??t??e');
    console.log('OK handleSuccess - course updated', data);
    this.updateCourseForm.reset();
    formDirective.reset();
    formDirective.resetForm();
    this.ngOnDestroy();
    this.coursesService.dispatchCourseCreated(data._id);
    this.router.navigate(['/home/courses']);
  }

  handleError(error: any) {
    console.log('KO handleError - course NOT updated', error);
  }

  refresh(data: any) {
    console.log('data', data);
    this.coursesService.getCourseById(this.courseId).subscribe((data) => {
      this.course = data;
    });
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
    this.router.navigate(['/home/courses']);
  }

  ngOnDestroy() {
    if(this.subCourse) {
      this.subCourse.unsubscribe();
    } else if(this.subStudents) {
      this.subStudents.unsubscribe();
    } else if(this.subUpdate) {
      this.subUpdate.unsubscribe();
    } else {
      return false;
    }
  }
}
