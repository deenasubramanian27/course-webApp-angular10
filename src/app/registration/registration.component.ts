import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../SERVICES/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

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

  constructor(private fb: FormBuilder,private api:AuthService ) {}

  onSubmit(): void {

    this.api.onSubmit(this.addressForm);
  //  alert("Registered Successfully");
  }
}
