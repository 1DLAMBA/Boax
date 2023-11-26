import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Boax2';
  constructor(private spinnerService: NgxSpinnerService){

  }
  visible!:boolean;
  ngOnInit(): void {
    this.spinnerService.show();
    
    this.visible=false;
    setTimeout(() => {
      
      this.spinnerService.hide();
      this.visible = true;
    }, 2000); 
  }
  
}
