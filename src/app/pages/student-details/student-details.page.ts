import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../../interfaces/course';
import { Student } from '../../interfaces/student';
import { StudentsService } from '../../services/students.service';
import { CoursesService } from '../../services/courses.service';

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

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.student$ = this.studentsService.getStudentById(this.id);
    this.registration = this.coursesService.getCourses().subscribe((res) => {
      this.courses = res;
      this.getStudentCourses(this.courses);
      console.log('view entered');
    });
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
    console.log('Destroyed');
  }

  close() {
    this.ngOnDestroy();
    this.router.navigate(['/home/students']);
  }
}
