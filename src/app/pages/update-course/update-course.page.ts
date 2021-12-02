import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { StudentsService } from '../../services/students.service';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { Course } from 'src/app/interfaces/course';
import { Student } from 'src/app/interfaces/student';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.page.html',
  styleUrls: ['./update-course.page.scss'],
})
export class UpdateCoursePage implements OnInit {
  updateCourseForm: any;
  courseId: any = '';
  course: Course;
  students: Student[] = [];
  message: string = '';
  text: string = '';
  errorFromServer = '';
  registration: any;
  registration1: any;
  registration2: any;
  registration3: any;
  registration4: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private el: ElementRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.registration = this.coursesService.getCourseById(this.courseId).subscribe(
      (data) => {
        this.course = data;
        console.log(this.course);
        this.createForm();
      },
      (error) => console.error(error)
    );

    this.registration1 = this.studentsService.getStudents().subscribe(
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
      registrations: [this.course.registrations]
    });
  }
  updateCourse(formDirective: FormGroupDirective) {
    if (this.updateCourseForm.valid) {
      console.log(this.updateCourseForm);
      this.registration2 = this.coursesService
        .updateCourseById(this.courseId, this.updateCourseForm.value)
        .subscribe(
          (data) => this.handleSuccess(data, formDirective),
          (error) => this.handleError(error)
        );
    }
  }
  handleSuccess(data: any, formDirective: FormGroupDirective) {
    this.showAlert('Cours mis à jour', 'Opération complétée');
    console.log('OK handleSuccess - course updated', data);
    this.updateCourseForm.reset();
    formDirective.reset();
    formDirective.resetForm();
    this.router.navigateByUrl('/home/courses', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/home/courses']);
  });
    this.coursesService.dispatchCourseCreated(data._id);
}

  handleError(error: any) {
    console.log('KO handleError - course NOT updated', error);
  }

  refresh(data: any) {
    console.log('data', data);
    this.registration3 = this.coursesService.getCourseById(this.courseId).subscribe((data) => {
      this.course = data;
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

  logout() {
    this.message = 'Vous êtes maintenant déconnecté';
    this.registration4 = this.authService.logout().subscribe((data) => {
      this.text = 'Au revoir ';
      console.log(data);
      this.registration4 = this.authService.showAlert(this.text, this.message);
      this.router.navigate(['']);
    });
  }

  ngOnDestroy() {
    this.registration.unsubscribe();
    this.registration1.unsubscribe();
    this.registration2.unsubscribe();
    this.registration3.unsubscribe();
    this.registration4.unsubscribe();
    console.log('destroyed');
  }

}

