import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from './nav/nav.component';
import { AngularFireModule } from '@angular/fire';
import { CoursesComponent } from './courses/courses.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RegistrationComponent } from './registration/registration.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './SERVICES/auth.service';
import { BannerComponent } from './banner/banner.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { EnrolledCourseComponent } from './enrolled-course/enrolled-course.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UpdateFormComponent } from './update-form/update-form.component';
import { RouterOutlet } from '@angular/router';
import { UserCoursesService } from './SERVICES/user-courses.service';
import { UserHomeListComponent } from './user-home-list/user-home-list.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CoursesComponent,
    LoginComponent,
    UserListComponent,
    RegistrationComponent,
    BannerComponent,
    ProfileComponent,
    EnrolledCourseComponent,
    UpdateFormComponent,
    UserHomeListComponent,

  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(
      {
        preventDuplicates:true
      }
    ),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatPaginatorModule,


    AngularFireModule.initializeApp({
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  apiKey: "AIzaSyCVll1TS1tvBy4f7y4fvLwr9Ox7cUCUg5Q",
  authDomain: "angular-handson-76791.firebaseapp.com",
  projectId: "angular-handson-76791",
  storageBucket: "angular-handson-76791.appspot.com",
  messagingSenderId: "1010395725320",
  appId: "1:1010395725320:web:194e7a7ec47e84ab7e1bbd",
  measurementId: "G-JWWSNCEN4Z"

    }),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
  ],
  providers: [AuthService,AuthGuard,ToastrService,UserCoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
