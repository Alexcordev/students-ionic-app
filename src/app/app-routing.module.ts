import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import('./index/index.module').then(m => m.IndexPageModule)
    },
    {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./pages/students/students.module').then( m => m.StudentsPageModule)
  },
  {
    path: 'course-details',
    loadChildren: () => import('./pages/course-details/course-details.module').then( m => m.CourseDetailsPageModule)
  },
  {
    path: 'student-details',
    loadChildren: () => import('./pages/student-details/student-details.module').then( m => m.StudentDetailsPageModule)
  },
  {
    path: 'student-details',
    loadChildren: () => import('./pages/student-details/student-details.module').then( m => m.StudentDetailsPageModule)
  },
  {
    path: 'create-student',
    loadChildren: () => import('./pages/create-student/create-student.module').then( m => m.CreateStudentPageModule)
  },
  {
    path: 'create-course',
    loadChildren: () => import('./pages/create-course/create-course.module').then( m => m.CreateCoursePageModule)
  },
  {
    path: 'update-student',
    loadChildren: () => import('./pages/update-student/update-student.module').then( m => m.UpdateStudentPageModule)
  },
  {
    path: 'update-course',
    loadChildren: () => import('./pages/update-course/update-course.module').then( m => m.UpdateCoursePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
