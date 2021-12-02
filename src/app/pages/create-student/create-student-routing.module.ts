import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateStudentPage } from './create-student.page';

const routes: Routes = [
  {
    path: '',
    component: CreateStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateStudentPageRoutingModule {}
