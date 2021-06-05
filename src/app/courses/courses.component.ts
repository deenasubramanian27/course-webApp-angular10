import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EMPTY, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../SERVICES/auth.service';
import { CdkNoDataRow } from '@angular/cdk/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export class courses {
  author: string;
  courseId: string;
  courseName: string;
  duration: string;
  language: string;
  price: string;
}

export class enrollCourse {
  author: string;
  courseId: string;
  courseName: string;
  duration: string;
  language: string;
  price: string;
  mail: string;
}
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  articles$: Observable<courses[]>;
  articles2$: Observable<enrollCourse[]>;
  profile: courses[];
  profile2: any;
  finalResult: courses;
  flag: boolean = false;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );
  number: number = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dat: AngularFirestore,
    public auth: AngularFireAuth,
    public api: AuthService,
    public toast: ToastrService,
    public router: Router
  ) {
    this.articles$ = this.dat
      .collection<courses>('courses')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as courses;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  ngOnInit(): void {
    this.articles$.subscribe(async (data) => {
      this.profile = await data;
      this.number = await this.profile.length;
      ////  console.log(this.profile);
    });
    this.flag = true;
  }

  checkStatus() {
    ////   console.log('lng' + this.number);
    if (this.number != 0 && this.flag == true) {
      return true;
    } else {
      return false;
    }
  }

  async addToCart(addCard: courses) {
    var obj = new enrollCourse();
    obj.author = addCard.author;
    obj.courseId = addCard.courseId;
    obj.courseName = addCard.courseName;
    obj.duration = addCard.duration;
    obj.language = addCard.language;
    obj.mail = localStorage.getItem('user');
    obj.price = addCard.price;
    await this.api.addCourses(obj);
  }
}
