import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegistrationComponent } from '../registration/registration.component';
import { FormGroup } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { courses, enrollCourse } from '../courses/courses.component';
import * as firebase from 'firebase';
import { FirebaseApp } from '@angular/fire';
import { JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap, map, mergeMap } from 'rxjs/operators';
import {} from '../enrolled-course/enrolled-course-datasource';
import { UserListItem } from '../user-list/user-list-datasource';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userCourse: Array<courses>;
  isLoggedInd = false;

  finalResult?: AngularFirestoreCollection<enrollCourse>;
  finalResult2?: enrollCourse;

  profile: any;
  flag = false;
  constructor(
    private fbAuth: AngularFireAuth,
    private ngZone: NgZone,
    private router: Router,
    private firestore: AngularFirestore,
    private toast: ToastrService
  ) {}

  async singIn(email: any, password: any) {
    await this.fbAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedInd = true;
        localStorage.setItem('user', JSON.stringify(res.user.email));
        this.router.navigate(['/course']);
        this.toast.success('Signed In', '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      })
      .catch((error: { message: any }) => {
        this.toast.error(error.message, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
        //window.alert(error.message)
      });
  }

  async SignUp(email: any, password: any) {
    await this.fbAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedInd = true;
        localStorage.setItem('user', JSON.stringify(res.user.email));
        this.router.navigate(['/registration']);
        this.toast.success('Successfully Signed Up', '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      })
      .catch((error: { message: any }) => {
        this.toast.error(error.message, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
        //window.alert(error.message)
      });
  }

  logOut() {
    this.isLoggedInd = false;
    this.firestore.persistenceEnabled$;
    return this.fbAuth.signOut().then(() => {
      if (localStorage.getItem('user') != null) {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
        this.toast.info('Signed Out', '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      }
    });
  }

  isLoggedIn() {
    const user = localStorage.getItem('user');
    return user ? true : false;
  }
  getUser() {
    const user = localStorage.getItem('user');
    return user ? user : null;
  }


  getUserList(){

    return this.firestore.collection<UserListItem>('registration').valueChanges()
  }

  onSubmit(res: FormGroup) {
    return this.firestore
      .collection('registration')
      .doc(localStorage.getItem('user'))
      .set(res.value)
      .then((result: any) => {
        this.toast.success('Registered Successfully', '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
        this.router.navigate(['/course']);
      })
      .catch((error: { message: any }) => {
        this.toast.error(error.message, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
        //window.alert(error.message)
      });
  }

  onUpdate(res: FormGroup) {
    return this.firestore
      .collection('registration')
      .doc(localStorage.getItem('user'))
      .set(res.value)
      .then((result: any) => {
        this.toast.success('Updated Successfully', '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
        this.router.navigate(['/profile']);
      })
      .catch((error: { message: any }) => {
        this.toast.error(error.message, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
        //window.alert(error.message)
      });
  }

  // getCourses(res1: string) {
  //   this.userCourseResult = this.firestore.collection<EnrolledCourseItem>(
  //     'userCourses',
  //     (ref) => {
  //       return ref.where('mail', '==', res1);
  //     }
  //   );
  //   this.userCourse$ = this.userCourseResult.valueChanges();

  //   this.userCourse$.subscribe((data) => {
  //     this.userCourseResult2 = data;
  //   });
  //   return this.userCourseResult2;
  // }

  //  addCourse(res: enrollCourse) {
  //   // this.firestore.collection<enrollCourse>('userCourses')
  //   // .snapshotChanges().pipe(
  //   //   map(actions => actions.map(a => {
  //   //     console.log('in snapshot');
  //   //     const data = a.payload.doc.data() as enrollCourse;
  //   //     const id = a.payload.doc.id;
  //   //     return { id, ...data };
  //   //   }))
  //   // ).subscribe(data=>{
  //   //   this.finalResult2=data;
  //   // });

  //   // console.log('article');
  //   //   this.articles$.subscribe(async data=>{
  //   //   this.finalResult= data.find(doc=>(doc.courseId=='java'));
  //   //  // this.finalResult2=this.finalResult
  //   //   })

  //   this.userCourse$ = this.firestore
  //     .collection<EnrolledCourseItem>('userCourses')
  //     .snapshotChanges()
  //     .pipe(
  //       map((actions) =>
  //         actions.map((a) => {
  //           const data = a.payload.doc.data() as EnrolledCourseItem;
  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         })
  //       )
  //     );

  //   // this.finalResult = await this.firestore.collection<enrollCourse>(
  //   //   'userCourses'
  //   //   // (ref) => {
  //   //   //   return ref
  //   //   //     .where('courseId', '==', res.courseId)
  //   //   //     .where('mail', '==', res.mail);
  //   //   // }
  //   // );

  //   // this.articles$ = this.finalResult.valueChanges();

  //   this.userCourse$.subscribe((data) => {
  //     this.finalResult2 = data.find(
  //       (i) => i.mail == res.mail && i.courseId == res.courseId
  //     );
  //     var cour = this.finalResult2?.courseId;
  //     var mail = this.finalResult2?.mail;
  //     var cour1 = res.courseId;
  //     var mail1 = res.mail;
  //     this.checkList(cour, mail, cour1, mail1, res);
  //     console.log('hihelllllllllliii' + this.finalResult2?.courseId);
  //     console.log('hihelllllllllliii' + this.finalResult2?.mail);
  //     // this.profile = data;
  //     // console.log(this.profile);
  //   });

  //   // await this.articles$.subscribe(async (data) => {
  //   //   this.finalResult2 = await data.find(
  //   //     (i) => i.mail == res.mail && i.courseId == res.courseId
  //   //   );
  //   //   var cour = this.finalResult2?.courseId;
  //   //   var mail = this.finalResult2?.mail;
  //   //   var cour1 = res.courseId;
  //   //   var mail1 = res.mail;
  //   //   this.checkList(cour, mail, cour1, mail1, res);
  //   //   console.log('hihelllllllllliii' + this.finalResult2?.courseId);
  //   //   console.log('hihelllllllllliii' + this.finalResult2?.mail);
  //   // });

  //   // if (
  //   //   res?.courseId == this.finalResult2?.courseId &&
  //   //   res?.mail == this.finalResult2?.mail &&
  //   //   this.finalResult2?.courseId == null
  //   // ) {
  //   //   console.log('hiiiii' + this.finalResult2?.mail);
  //   //   this.toast.success('Already this course is added', '', {
  //   //     timeOut: 2000,
  //   //     progressBar: true,
  //   //     progressAnimation: 'increasing',

  //   //     //  console.log('innnn'+this.finalResult.courseName);
  //   //   });
  //   // } else {
  //   //   // console.log('out');

  //   //   return this.firestore
  //   //     .collection('userCourses')
  //   //     .doc()
  //   //     .set(Object.assign({}, res))
  //   //     .then((result: any) => {
  //   //       this.toast.success('Course Added Successfully', '', {
  //   //         timeOut: 2000,
  //   //         progressBar: true,
  //   //         progressAnimation: 'increasing',
  //   //       });
  //   //       this.router.navigate(['/course']);
  //   //     })
  //   //     .catch((error: { message: any }) => {
  //   //       this.toast.error(error.message, '', {
  //   //         timeOut: 2000,
  //   //         progressBar: true,
  //   //         progressAnimation: 'increasing',
  //   //       });
  //   //       //window.alert(error.message)
  //   //     });
  //   // }
  // }

  // checkList(
  //   courseId: string,
  //   mail: string,
  //   courseId2: string,
  //   mail2: string,
  //   res: enrollCourse
  // ) {
  //   console.log('outside sub id' + this.finalResult2?.courseId);
  //   console.log('outside sub mail' + this.finalResult2?.mail);
  //   if (courseId == courseId2 && mail == mail2) {
  //     console.log('inside check list if loop' + courseId);
  //     this.toast.success('Already this course is added', '', {
  //       timeOut: 2000,
  //       progressBar: true,
  //       progressAnimation: 'increasing',

  //       //  console.log('innnn'+this.finalResult.courseName);
  //     });
  //   } else {
  //     console.log('inside checklist else block');

  //     this.firestore
  //       .collection('userCourses')
  //       .doc()
  //       .set(Object.assign({}, res))
  //       .then((result: any) => {
  //         this.toast.success('Course Added Successfully', '', {
  //           timeOut: 2000,
  //           progressBar: true,
  //           progressAnimation: 'increasing',
  //         });
  //         this.router.navigate(['/course']);
  //       })
  //       .catch((error: { message: any }) => {
  //         this.toast.error(error.message, '', {
  //           timeOut: 2000,
  //           progressBar: true,
  //           progressAnimation: 'increasing',
  //         });
  //         //window.alert(error.message)
  //       });
  //   }
  // }

  //  async addCourse1(res: enrollCourse) {
  //   var flag = false;
  //   var snapshotResult = this.firestore
  //     .collection('userCourses', (ref) =>
  //       ref
  //         .where('courseId', '==', res.courseId)
  //         .where('mail', '==', res.mail)
  //         .limit(1)
  //     )
  //     .snapshotChanges()
  //     .pipe(mergeMap((userCourses) => userCourses));
  //   snapshotResult.subscribe((doc) => {
  //     var task = <enrollCourse>doc.payload.doc.data();
  //     console.log(task.author);
  //     console.log(task.courseId);
  //     console.log(task.courseName);
  //     console.log(task.duration);
  //     console.log(task.language);
  //     console.log(task.mail);
  //     console.log(task.price);
  //     if (task.courseId == res.courseId && task.mail == res.mail) {
  //       console.log('course already added');
  //     }
  //     // this.clientRef = doc.payload.doc.ref;
  //   });
  //   return true;
  // }

  addCourses(res1: enrollCourse) {
  ////  console.log('res det ' + res1.courseName);
    var task = this.firestore
      .collection('userCourses', (ref) =>
        ref
          .where('courseId', '==', res1.courseId)
          .where('mail', '==', res1.mail)
      )
      .snapshotChanges();
    var status;
    task.subscribe((res) => {
      res.forEach((d) => {
        status = d.payload.type;
     ////   console.log('----------' + d.payload.type);
      });
      if (
        res.length == 1 &&
        this.flag == false &&
        localStorage.getItem('user') != null
      ) {
     ////   console.log('match found');
        this.toast.success(res1.courseName+' Course Already Added', '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      } else if (
        res.length == 0 &&
        localStorage.getItem('user') != null &&
        status != 'modified'
      ) {
        this.flag = true;
       ////  console.log('first insert' + this.flag);
        this.firestore
          .collection('userCourses')
          .doc()
          .set(Object.assign({}, res1))
          .then((result: any) => {
            this.toast.success(res1.courseName+' Course Added Successfully', '', {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
            });
            this.router.navigate(['/course']);
          })
          .catch((error: { message: any }) => {
            this.toast.error(error.message, '', {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
            });
            //window.alert(error.message)
          });
      } else {
        // console.log('no match found');
        // this.dat
        //   .collection('userCourses')
        //   .doc()
        //   .set(Object.assign({}, obj))
        //   .then((result: any) => {
        //     this.toast.success('Course Added Successfully', '', {
        //       timeOut: 2000,
        //       progressBar: true,
        //       progressAnimation: 'increasing',
        //     });
        //     this.router.navigate(['/course']);
        //   })
        //   .catch((error: { message: any }) => {
        //     this.toast.error(error.message, '', {
        //       timeOut: 2000,
        //       progressBar: true,
        //       progressAnimation: 'increasing',
        //     });
        //     //window.alert(error.message)
        //   });
      }
    });
    this.flag = false;

    // task.subscribe((res) => {
    //   if (res.length >= 1) {
    //     console.log('match found');
    //     this.toast.success('Course Already Added', '', {
    //       timeOut: 2000,
    //       progressBar: true,
    //       progressAnimation: 'increasing',
    //     });
    //   } else if (res.length == 0) {
    //     console.log('first insert');
    //     this.dat
    //       .collection('userCourses')
    //       .doc()
    //       .set(Object.assign({}, obj))
    //       .then((result: any) => {
    //         this.toast.success('Course Added Successfully', '', {
    //           timeOut: 2000,
    //           progressBar: true,
    //           progressAnimation: 'increasing',
    //         });
    //         this.router.navigate(['/course']);
    //       })
    //       .catch((error: { message: any }) => {
    //         this.toast.error(error.message, '', {
    //           timeOut: 2000,
    //           progressBar: true,
    //           progressAnimation: 'increasing',
    //         });
    //         //window.alert(error.message)
    //       });
    //   } else {
    //     console.log('no match found');
    //     this.dat
    //       .collection('userCourses')
    //       .doc()
    //       .set(Object.assign({}, obj))
    //       .then((result: any) => {
    //         this.toast.success('Course Added Successfully', '', {
    //           timeOut: 2000,
    //           progressBar: true,
    //           progressAnimation: 'increasing',
    //         });
    //         this.router.navigate(['/course']);
    //       })
    //       .catch((error: { message: any }) => {
    //         this.toast.error(error.message, '', {
    //           timeOut: 2000,
    //           progressBar: true,
    //           progressAnimation: 'increasing',
    //         });
    //         //window.alert(error.message)
    //       });
    //   }
    // });
    // console.log('fetching');
  }
}
