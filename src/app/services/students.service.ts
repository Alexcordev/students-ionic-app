import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Student } from '../interfaces/student';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
baseUrl: string = "http://192.168.2.14:3000/api";
students: Student[] = [];
  private studentUpdated = new Subject<string>();
  private studentCreated = new Subject<string>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  createStudent(student: Student) {
    return this.httpClient.post<Student>(
      `${this.baseUrl}/add-student`,
      student
    );
  }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseUrl}/students`);
  }

  getStudentById(id: string): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseUrl}/student/${id}`);
  }

  updateStudentById(id: string, student: Student) {
    return this.httpClient.put(`${this.baseUrl}/update-student/${id}`, student);
  }

  deleteStudentById(id: string): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseUrl}/delete-student/${id}`);
  }

  dispatchStudentCreated(id: string) {
    this.studentCreated.next(id);
  }

  handleStudentCreated() {
    return this.studentCreated.asObservable();
  }

  dispatchStudentUpdated(id: string) {
    this.studentUpdated.next(id);
  }

  handleStudentUpdated() {
    return this.studentUpdated.asObservable();
  }
}
