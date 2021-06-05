import { Injectable, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EnrolledCourseItem } from '../enrolled-course/enrolled-course-datasource';

@Injectable({
  providedIn: 'root',
})
export class UserCoursesService implements OnInit {
  itemsCollection: AngularFirestoreCollection<EnrolledCourseItem>;
  items: Observable<EnrolledCourseItem[]>;
  name: string;

  constructor(
    public afs: AngularFirestore,
    public router: Router,
    public toast: ToastrService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getItems(res:string) {
  //  this.name = localStorage.getItem('user');
   //// console.log('name' + this.name);
    this.items = this.afs
      .collection<EnrolledCourseItem>('userCourses', (ref) => {
        return ref.where('mail', '==', res);
      })
      .valueChanges();
    return this.items;
  }

  async deleteItem(data: EnrolledCourseItem) {
    var course = data.courseName;
    this.afs
      .collection('userCourses', (ref) =>
        ref
          .where('courseId', '==', data.courseId)
          .where('mail', '==', data.mail)
      )
      .get()
      .subscribe((delitems) => delitems.forEach((doc) => doc.ref.delete()))
      .unsubscribe;
    //  window.location.reload();
    // this.router.navigate(['/enrolledCourse']);
    this.toast.info(course + ' Removed', '', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
    //   alert('record erased');
  }
}
