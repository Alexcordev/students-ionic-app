import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Student } from 'src/app/interfaces/student';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.page.html',
  styleUrls: ['./update-student.page.scss'],
})
export class UpdateStudentPage implements OnInit {
  updateStudentForm: any;
  studentId: any = '';
  student: Student;
  message: string = '';
  text: string = '';
  errorFromServer = '';
  registration: any;
  registration1: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private studentsService: StudentsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.registration = this.studentsService.getStudentById(this.studentId).subscribe(
      (data) => {
        this.student = data;
        this.createForm();
        console.log(this.student);
      },
      (error) => console.error(error)
    );
    console.log('view entered');
  }

  createForm() {
    this.updateStudentForm = this.fb.group({
      surname: this.student.surname,
      name: this.student.name,
      dob: this.student.dob,
    });
  }
  updateStudent(formDirective: FormGroupDirective) {
    if (this.updateStudentForm.valid) {
      console.log(this.updateStudentForm);
      this.registration1 = this.studentsService
        .updateStudentById(this.studentId, this.updateStudentForm.value)
        .subscribe(
          (data) => this.handleSuccess(data, formDirective),
          (error) => this.handleError(error)
        );
    }
  }
  handleSuccess(data: any, formDirective: FormGroupDirective) {
    this.showAlert('Étudiant mis à jour', 'Opération complétée');
    console.log('OK handleSuccess - student updated', data);
    this.updateStudentForm.reset();
    formDirective.reset();
    formDirective.resetForm();
    this.studentsService.dispatchStudentCreated(data._id);
    this.ngOnDestroy();
    this.router.navigate(['/home/students']);
  }

  handleError(error: any) {
    console.log('KO handleError - student NOT updated', error);
  }

  refresh(data: any) {
    console.log('data', data);
    this.studentsService.getStudentById(this.studentId).subscribe((data) => {
      this.student = data;
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

  ngOnDestroy() {
    this.registration.unsubscribe();
    this.registration1.unsubscribe();
    console.log('destroyed');
  }

  close() {
    this.registration.unsubscribe();
    this.router.navigate(['/home/students']);
  }

  ionViewDidLeave() {
    this.registration.unsubscribe();
  }
}
