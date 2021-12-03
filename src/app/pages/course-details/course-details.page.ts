import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../../interfaces/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {
  course$: Observable<Course>;
  courses: any[] = [];
  id: any;
  studentCourses: any[] = [];
  message: string = '';
  text: string = '';
  registration: any;

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}


  ionViewDidEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.course$ = this.coursesService.getCourseById(this.id);
    this.registration = this.coursesService.getCourses().subscribe((res) => {
      this.courses = res;
      this.getStudentCourses(this.courses);
    });
    console.log('entered');
  }

  getStudentCourses(tab: Course[]) {
    this.studentCourses = [];
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

  ngOnDestroy() {
    this.registration.unsubscribe();
  }

  close() {
    this.ngOnDestroy();
    this.router.navigate(['/home/courses']);
  }
}
