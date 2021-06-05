import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../SERVICES/auth.service';

export interface profile{
  address:string;
  address2?:string;
  city:string;
  contact:string;
firstName:string;
lastName:string;
postalCode:number;
sex:string;
state:string;
mail:string;
}

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit{
  articles$: Observable<profile[]>;
  profile: any;
  finalResult:profile;

  addressForm = this.fb.group({
    contact: [null,Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    sex: ['male', Validators.required],
    mail:[localStorage.getItem('user'),Validators.required]

  });

  hasUnitNumber = false;

  @HostListener('window:hashchange', ['$event'])
  hashChangeHandler(e) {
    window.location.hash = "dontgoback";
  }

  states = [
    {name: 'Andhra Pradesh', abbreviation: 'AP'},
    {name: 'Arunachal Pradesh', abbreviation: 'AR'},
    {name: 'Assam', abbreviation: 'AS'},
    {name: 'Bihar', abbreviation: 'BR'},
    {name: 'Chhattisgarh', abbreviation: 'CT'},
    {name: 'Goa', abbreviation: 'GA'},
    {name: 'Gujarat', abbreviation: 'GJ'},
    {name: 'Haryana', abbreviation: 'HR'},
    {name: 'Himachal Pradesh', abbreviation: 'HP'},
    {name: 'Jammu and Kashmir', abbreviation: 'JK'},
    {name: 'Jharkhand', abbreviation: 'JH'},
    {name: 'Karnataka', abbreviation: 'KA'},
    {name: 'Kerala', abbreviation: 'KL'},
    {name: 'Madhya Pradesh', abbreviation: 'MP'},
    {name: 'Maharashtra', abbreviation: 'MH'},
    {name: 'Manipur', abbreviation: 'MN'},
    {name: 'Meghalaya', abbreviation: 'ML'},
    {name: 'Mizoram', abbreviation: 'MZ'},
    {name: 'Nagaland', abbreviation: 'NL'},
    {name: 'Odisha', abbreviation: 'OR'},
    {name: 'Punjab', abbreviation: 'PB'},
    {name: 'Rajasthan', abbreviation: 'RJ'},
    {name: 'Sikkim', abbreviation: 'SK'},
    {name: 'Tamil Nadu', abbreviation: 'TN'},
    {name: 'Telangana', abbreviation: 'TG'},
    {name: 'Tripura', abbreviation: 'TR'},
    {name: 'Uttarakhand', abbreviation: 'UT'},
    {name: 'Uttar Pradesh', abbreviation: 'UP'},
    {name: 'West Bengal', abbreviation: 'WB'},
    {name: 'Andaman and Nicobar Islands', abbreviation: 'AN'},
    {name: 'Chandigarh', abbreviation: 'CH'},
    {name: 'Dadra and Nagar Haveli', abbreviation: 'DN'},
    {name: 'Daman and Diu', abbreviation: 'DD'},
    {name: 'Delhi', abbreviation: 'DL'},
    {name: 'Lakshadweep', abbreviation: 'LD'},
    {name: 'Puducherry', abbreviation: 'PY'}
  ];

  constructor(private fb: FormBuilder,private api:AuthService,public dat:AngularFirestore,public auth:AngularFireAuth ,private toast:ToastrService) {
    this.articles$ = this.dat.collection<profile>('registration')
            .snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data = a.payload.doc.data() as profile;
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            );
  }
  ngOnInit(): void {
    this.articles$.subscribe(
      data=>{
        const res=data.find(doc=>(doc.mail==localStorage.getItem('user')));
this.finalResult=res;
       this.addressForm.patchValue(
         {
          contact:this.finalResult.contact,
          firstName: this.finalResult.firstName,
          lastName: this.finalResult.lastName,
          address: this.finalResult.address,
          address2: this.finalResult.address2,
          city: this.finalResult.city,
          state: this.finalResult.state,
          postalCode: this.finalResult.postalCode,
          sex: this.finalResult.sex,
          mail:this.finalResult.mail,

         }
       )
      }
    )
  }

  onSubmit(): void {

    if (this.addressForm.controls['firstName'].hasError('required') ||
    this.addressForm.controls['lastName'].hasError('required') ||
    this.addressForm.controls['contact'].hasError('required') ||
    this.addressForm.controls['address'].hasError('required') ||
    this.addressForm.controls['city'].hasError('required') ||
    this.addressForm.controls['state'].hasError('required')||
    this.addressForm.controls['postalCode'].hasError('required') ||
    this.addressForm.controls['sex'].hasError('required') ||
    this.addressForm.controls['mail'].hasError('required')) {

      this.toast.error("Please Input the Correct Data",'',  {
        timeOut:2000,
        progressBar:true,
        progressAnimation:'increasing',
      });
    }
else{
  this.api.onUpdate(this.addressForm);
}

   // alert("Updated Successfully");
  }
}
