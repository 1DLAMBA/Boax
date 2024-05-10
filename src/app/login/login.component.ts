import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute,
  ActivatedRouteSnapshot,
  Route, } from '@angular/router';
  import { environment } from '../environment';
  import { MessageService } from 'primeng/api';
import { RegistrationEndpoint } from '../api/endpoints/registration.Endpoint';
import { RegistrationResource } from '../api/models/registration.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  register: RegistrationResource[]=[];
  loginForm: FormGroup;
  email: any[]=[];
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private route: ActivatedRoute,
    private _http:HttpClient,
    private registerEndpoint: RegistrationEndpoint,
    private spinnerService: NgxSpinnerService
  ){
    this.loginForm = this.fb.group({
      password:this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.spinnerService.show();

    setTimeout(() => {
      
      this.spinnerService.hide();
    }, 2000); 
  }
  login() {
    this.spinnerService.show();
    const formData = {
    email: this.loginForm.value.email,
    password: this.loginForm.value.password,
    }

    this._http.post(`${environment.baseUrl}/login`,
   formData
    ).subscribe((response: any)=> {
      if(response.user){
        this.router.navigate(['account'])
         console.log('response', response.user)
         console.log('respone', response.email)
         this.email = response.email;
         localStorage.setItem('email', response.email);
         localStorage.setItem('id', response.user.id);
         localStorage.setItem('name', response.name);
         localStorage.setItem('account_balance', response.account_balance);
      }
      },
      (error) => {
        // The login is not successful
        // Display an error message
        if(error){}
        // window.alert('Invalid Credentials');
        console.error(error);
        this.spinnerService.hide();
      }
    );
    console.log('a', formData)
  }
}
