import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute,
  ActivatedRouteSnapshot,
  Route, } from '@angular/router';
import { RegistrationEndpoint } from '../api/endpoints/registration.Endpoint';
import { RegistrationResource } from '../api/models/registration.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  register: RegistrationResource[]=[];
  RegistrationForm: FormGroup;
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private route: ActivatedRoute,
    private _http:HttpClient,
    private registerEndpoint: RegistrationEndpoint,
    private spinnerService: NgxSpinnerService
  ){
    this.RegistrationForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      phoneno: this.fb.control('', [Validators.required]),
      password:this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control(''),
      city: this.fb.control('', [Validators.required]),
      address: this.fb.control('', [Validators.required]),
      state: this.fb.control('', [Validators.required]),
      zip: this.fb.control('', [Validators.required]),
      accepted_tcs: this.fb.control('', [Validators.required])

    });
  }
  
  ngOnInit(): void {
    this.spinnerService.show();

    setTimeout(() => {
      
      this.spinnerService.hide();
    }, 2000); 
  }
  save(){
    
   if (this.RegistrationForm.valid) {
    // Check if passwords match
    if (this.RegistrationForm.value.password !== this.RegistrationForm.value.confirmPassword) {
      // Handle password mismatch
      console.log('Password MisMatch');
    }
    }
    const formData = {
      name: this.RegistrationForm.value.name,
      email: this.RegistrationForm.value.email,
      password: this.RegistrationForm.value.password,
      city: this.RegistrationForm.value.city,
      phoneno: this.RegistrationForm.value.phoneno,
      address: this.RegistrationForm.value.address,
      zip: this.RegistrationForm.value.zip,
      state: this.RegistrationForm.value.state,
     
   }
   
    console.warn(formData);
   
    if (this.RegistrationForm.valid) {
      // Send the form data to Laravel backend using HTTP POST request
      this._http.post('http://127.0.0.1:8000/api/register', this.RegistrationForm.value).subscribe(
        (response) => {
          // Handle success response here
          console.log('Registration successful', response);
          this.router.navigate(['login'])
        },
        (error: any) => {
          // Handle registration error
          if (error.status === 409) {
            // Email already exists
            console.log('Email already exists.');
          } else {
            // Other error
            console.log(error);
          }
        
        }
      );
    }

  }
  get RegistrationFormControls(){
    return this.RegistrationForm.controls;
  }
  


}
