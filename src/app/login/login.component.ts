import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/SERVICES/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;

  constructor(public fb: FormBuilder,private auth:AuthService,private router:Router,private toast:ToastrService) {
    this.auth.logOut();
  }

  ngOnInit(): void {

    this.createForm()
  }

  createForm(){
    this.LoginForm=this.fb.group({
      email:[''],
      password:['']
    })

  }


  workingonIT(){
    this.toast.success("Available Soon",'',  {
      timeOut:2000,
      progressBar:true,
      progressAnimation:'increasing',
    });
  }
  async signIn1(){
   await this.auth.singIn(this.LoginForm.value.email,this.LoginForm.value.password)
  }

  async createAccount(){
    await this.auth.SignUp(this.LoginForm.value.email,this.LoginForm.value.password)
  }



}


