import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Course } from '../../interfaces/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit, OnDestroy {
  course: Course;
  courses: any[] = [];
  id: any;
  studentCourses: any[] = [];
  message: string = '';
  text: string = '';
  subCourse: Subscription;
  subCourses: Subscription;

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        this.navCtrl.navigateBack('/home/courses');
      }
      this.subCourse = this.coursesService.getCourseById(paramMap.get('id')).subscribe(course => {
        this.course = course;
      });
    })
  }

  ionViewDidEnter() {
    this.subCourses = this.coursesService.getCourses().subscribe((res) => {
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

  close() {
    this.router.navigate(['/home/courses']);
  }

  ngOnDestroy() {
    if (this.subCourse) {
      this.subCourse.unsubscribe();
    } else if (this.subCourses) {
      this.subCourses.unsubscribe();
    } else {
      return false;
    }
  }
}
