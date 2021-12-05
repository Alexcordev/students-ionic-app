import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../../interfaces/course';
import { Student } from '../../interfaces/student';
import { StudentsService } from '../../services/students.service';
import { CoursesService } from '../../services/courses.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit, OnDestroy {
  student: Student;
  courses: any[] = [];
  id: any;
  studentCourses: any[] = [];
  message: string = '';
  text: string = '';
  subStudent: Subscription;
  subCourses: Subscription;

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        this.navCtrl.navigateBack('/home/students');
      }
      this.subStudent = this.studentsService.getStudentById(paramMap.get('id')).subscribe(student => {
        this.student = student;
      });
    })
  }

  ionViewDidEnter() {
    this.subCourses = this.coursesService.getCourses().subscribe((res) => {
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

  close() {
    this.router.navigate(['/home/students']);
  }

  ngOnDestroy() {
    if (this.subStudent) {
      this.subStudent.unsubscribe();
    } else if (this.subCourses) {
      this.subCourses.unsubscribe();
    }
  }
}
