import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
      path: 'students',
      children: [
        {
          path: '',
          loadChildren: () => import('../pages/students/students.module').then(
            m => m.StudentsPageModule
            )
        },
        {
          path: ':username',
          loadChildren: () => import('../pages/students/students.module').then(
            m => m.StudentsPageModule
            )
        },
      ],
    },
      {
        path: 'courses',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/courses/courses.module').then(
              m => m.CoursesPageModule
              )
          },
          {
            path: ':username',
            loadChildren: () => import('../pages/courses/courses.module').then(m => m.CoursesPageModule)
          },
        ]
      },
      {
        path: 'create-student',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/create-student/create-student.module').then(
              m => m.CreateStudentPageModule
              )
          },
        ]
      },
      {
        path: 'create-course',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/create-course/create-course.module').then(
              m => m.CreateCoursePageModule
              )
          },
        ]
      },
      {
        path: 'student-details',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/student-details/student-details.module').then(
              m => m.StudentDetailsPageModule
              )
          },
          {
            path: ':id',
            loadChildren: () => import('../pages/student-details/student-details.module').then(m => m.StudentDetailsPageModule)
          },
        ]
      },
      {
        path: 'course-details',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/course-details/course-details.module').then(
              m => m.CourseDetailsPageModule
              )
          },
          {
            path: ':id',
            loadChildren: () => import('../pages/course-details/course-details.module').then(m => m.CourseDetailsPageModule)
          },
        ]
      },
      {
        path: 'update-course',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/update-course/update-course.module').then(
              m => m.UpdateCoursePageModule
              )
          },
          {
            path: ':id',
            loadChildren: () => import('../pages/update-course/update-course.module').then(m => m.UpdateCoursePageModule)
          },
        ]
      },
      {
        path: 'update-student',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/update-student/update-student.module').then(
              m => m.UpdateStudentPageModule
              )
          },
          {
            path: ':id',
            loadChildren: () => import('../pages/update-student/update-student.module').then(m => m.UpdateStudentPageModule)
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRouter {}
