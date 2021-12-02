import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../../interfaces/course';
import { Student } from '../../interfaces/student';
import { StudentsService } from '../../services/students.service';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit {
  student$: Observable<Student>;
  courses: any[] = [];
  id: any;
  studentCourses: any[] = [];
  message: string = '';
  text: string = '';
  registration: any;
  registration1: any;
  registration2: any;

  constructor(private router: Router, private authService: AuthService, private coursesService: CoursesService, private activatedRoute: ActivatedRoute, private studentsService: StudentsService) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.registration = this.student$ = this.studentsService.getStudentById(this.id);
    this.registration1 = this.coursesService.getCourses().subscribe((res) => {
      this.courses = res;
      this.getStudentCourses(this.courses);
    });
    console.log('view entered');
}

  getStudentCourses(tab: Course[]) {
    let elem: Course;
    let course: any = '';
    let students: any = '';
    tab.forEach((el) => {
      elem = el;
      elem.registrations.forEach((element) => {
        if (element != null) {
          course = elem.name;
          students = element;
          this.studentCourses.push({ course: course, students: students });
        }
      });
    });
    console.log(this.studentCourses);
  }

  logout() {
    this.message = 'Vous êtes maintenant déconnecté';
    this.registration2 = this.authService.logout().subscribe((data) => {
      this.text = 'Au revoir ';
      console.log(data);
      this.authService.showAlert(this.text, this.message);
      this.router.navigate(['']);
    });
  }

  ngOnDestroy() {
    this.registration.unsubscribe();
    this.registration1.unsubscribe();
    this.registration2.unsubscribe();
    console.log('Destroyed');
  }

}
