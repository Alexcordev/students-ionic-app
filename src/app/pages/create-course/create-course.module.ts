import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCoursePageRoutingModule } from './create-course-routing.module';

import { CreateCoursePage } from './create-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateCoursePageRoutingModule
  ],
  declarations: [CreateCoursePage]
})
export class CreateCoursePageModule {}
