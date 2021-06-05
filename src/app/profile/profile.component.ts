import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface profile {
  address: string;
  address2: string;
  city: string;
  contact: string;
  firstName: string;
  lastName: string;
  postalCode: number;
  sex: string;
  state: string;
  mail: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  articles$: Observable<profile[]>;
  profile: any;
  finalResult: profile;
  links = environment.apiUrl;
  constructor(public dat: AngularFirestore, public auth: AngularFireAuth) {
    this.articles$ = this.dat
      .collection<profile>('registration')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as profile;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  ngOnInit(): void {
    this.articles$.subscribe((data) => {
      const res = data.find((doc) => doc.mail == localStorage.getItem('user'));
      this.finalResult = res;
    });
  }
}
