import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  baseUrl: string = "http://192.168.2.14:3000/api";
  private courseUpdated = new Subject<string>();
  private courseCreated = new Subject<string>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  createCourse(student: Course) {
    return this.httpClient.post<Course>(`${this.baseUrl}/add-course`, student);
  }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.baseUrl}/courses`);
  }

  getCourseById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.baseUrl}/course/${id}`);
  }

  updateCourseById(id: string, course: Course) {
    return this.httpClient.put(`${this.baseUrl}/update-course/${id}`, course);
  }

  deleteCourseById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.baseUrl}/delete-course/${id}`);
  }

  dispatchCourseCreated(id: string) {
    this.courseCreated.next(id);
  }

  handleCourseCreated() {
    return this.courseCreated.asObservable();
  }

  dispatchCourseUpdated(id: string) {
    this.courseUpdated.next(id);
  }

  handleCourseUpdated() {
    return this.courseUpdated.asObservable();
  }
}
