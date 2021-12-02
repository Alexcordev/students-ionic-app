import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../../interfaces/course';
import { Student } from '../../interfaces/student';
import { StudentsService } from '../../services/students.service';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {
  course: Course;
  courses: any[] = [];
  id: any;
  studentCourses: any[] = [];
  message: string = '';
  text: string = '';
  registration: any;
  registration1: any;
  registration2: any;

  constructor(private authService: AuthService, private router: Router, private coursesService: CoursesService, private activatedRoute: ActivatedRoute, private studentsService: StudentsService) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.registration = this.coursesService.getCourseById(this.id)
    .subscribe(data => {
      this.course = data;
    });
    this.registration1 = this.coursesService.getCourses().subscribe((res) => {
      this.courses = res;
      this.getStudentCourses(this.courses);
    });
    console.log('entered');
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

  refresh(data: any) {
    console.log('data', data);
    this.coursesService.getCourseById(this.id).subscribe((data) => {
      this.course = data;
    });
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
  }

}

