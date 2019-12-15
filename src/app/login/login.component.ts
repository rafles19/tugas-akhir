import { Component, OnInit } from '@angular/core';
import { PelayanApiService } from '../_shared/services/pelayan-api.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public regForm: any;

  constructor(public pelayan: PelayanApiService, public jwt: JwtHelperService, public fb: FormBuilder) { }

  ngOnInit() {
    this.regForm = this.fb.group({
      uname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  userLogin() {
    var username = this.regForm.value.uname;
    var password = CryptoJS.SHA512(this.regForm.value.password).toString();
    var rememberme = <HTMLInputElement>document.getElementById('rememberme');
    var isChecked = rememberme.checked;
    console.log(isChecked);

    var formLogin = {
      'user_name': username,
      'password': password,
      'remember_me': isChecked
    }

    this.pelayan.login(formLogin.user_name, formLogin.password)
      .subscribe(res => console.log(res), err => console.log(err));
  }
} 
