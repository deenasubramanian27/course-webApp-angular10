import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BannerComponent } from './banner/banner.component';
import { CoursesComponent } from './courses/courses.component';
import { EnrolledCourseComponent } from './enrolled-course/enrolled-course.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { UpdateFormComponent } from './update-form/update-form.component';
import { UserHomeListComponent } from './user-home-list/user-home-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
path:'',component:LoginComponent,
  },
  {
    path:'course',component:CoursesComponent,canActivate:[AuthGuard]
  },
  {
    path:'login',component:LoginComponent,
  },
  {
path:'usersList',component:UserHomeListComponent,
  },
  {
    path:'registration',component:RegistrationComponent,canActivate:[AuthGuard]
  },
  {
    path:'profile',component:ProfileComponent,canActivate:[AuthGuard]
  },
  {
    path:'enrolledCourse',component:EnrolledCourseComponent,canActivate:[AuthGuard]
  },
  {
    path:'updateDetails',component:UpdateFormComponent,canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
