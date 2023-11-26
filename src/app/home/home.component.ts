import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PrimeNGConfig } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
// import AOS from 'aos';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  

  constructor(private spinnerService: NgxSpinnerService) {
    
  }
  
  ngOnInit(): void {
    // AOS.refresh();
    
    // AOS.init();
  }

}
