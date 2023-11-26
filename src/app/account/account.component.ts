import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  singleresult:any[]=[];
  AcctName: any[]=[];
  AcctID!: any;
  balance1: any[]=[];
  AcctEmail: any[]=[];
  Transactions: any[]=[];
  TransactionType='';
  TransactionDate:any[]=[];
  email!: any;
  id!:any;
  balance!:any;
  name!:any;
  isConditionMet!:boolean;
  AccountForm: FormGroup;
  resultbalance: any;
  user: any;
  constructor(private _http:HttpClient, private readonly fb: FormBuilder,private router:Router,private spinnerService: NgxSpinnerService){
    this.AccountForm = this.fb.group({
      account_balance: ['', [Validators.required]],
      receivername:[''],
      receiveracct:[''],
      description:['']
    })
  }
  visible: boolean = false;
  visible2:boolean = false;
  visible3:boolean = false;
  visible4:boolean = false;

    showDialog() {
        this.visible = true;
    }
    showDialog2(){
      this.visible2=true
    }
    showDialog3(){
      this.visible2=false;
      this.visible3=true;
    }
    ctrlDialog(){
      this.visible2=true;
      this.visible3=false;
    }
    
    

  ngOnInit(): void{
    setTimeout(() => {
      
      this.spinnerService.hide();
    }, 2000); 
this.email = localStorage.getItem('email');
this.id = localStorage.getItem('id');
this.name = localStorage.getItem('name');
// this.balance = localStorage.getItem('account_balance');
this.getUser();
this.getTransaction();
  }
  sendMoney(){
    console.warn(this.singleresult, this.AccountForm.value.account_balance );
    
    if (this.singleresult < this.AccountForm.value.account_balance) {
      this.visible4 = false;
      Swal.fire(
        'error',
        `Insufficient Funds`,
        'error'
      )
     
    }else{
      this.sendMoneysub();
      this.saveAcct2();
      this.BoaxTransaction();
      this.BoaxTransaction2();
      this.visible4=false;
      Swal.fire(
        'Success',
        `Transaction of ${this.AccountForm.value.account_balance} to ${this.AcctName} Successful`,
        'success'
      ).then(()=>{
       location.reload()
      });
      
    }

    
   
    
  }
  save(){
    
    if(this.AccountForm.valid){
      this.saveAcct();
      this.SaveTransaction();
      this.getUser();
      Swal.fire(
        'Success',
        `Transaction of ${this.AccountForm.value.account_balance} Successfull`,
        'success'
      ).then(()=>{
       location.reload()
      })
    }else{
      this.visible = false;
      Swal.fire(
        'Error',
        `Please fill accordingly`,
        'error'
        )
      }
    }
    save2(){
    this.visible2 = false;
    if(this.singleresult < this.AccountForm.value.account_balance){
      Swal.fire(
        'error',
        `Insufficient Funds`,
        'error'
      )
    } else if(this.AccountForm.valid){
      this.saveAcct2();
      this.SaveTransaction2();
      this.getUser();
      Swal.fire(
        'Success',
        `Transaction of ${this.AccountForm.value.account_balance} Successful`,
        'success'
      ).then(()=>{
       location.reload()
      })
    }else{
      Swal.fire(
        'Error',
        `Please fill accordingly`,
        'error'
      )
    }
  }
  getAccount(){
 
    this._http.get(`http://127.0.0.1:8000/api/register/get/${this.AccountForm.value.receiveracct}`).subscribe((response:any) => {
    this.AcctName = response.message.name;
    this.AcctID = response.message.id;
    this.AcctEmail = response.message.email;
    console.log('single', this.AcctName);
    this.visible3=false;
    this.visible4=true;
    
  });

  }
  sendMoneysub(){
    const formData={
      account_balance: this.AccountForm.value.account_balance
    }
    this._http.put(`http://127.0.0.1:8000/api/account/update/${this.AcctID}`, formData)
    .subscribe((response:any)=>{
      console.log('Balance Added', response.status)
      // console.log('check', response.balance);
      // location.reload();
    })

  }
saveAcct(){
  const formData={
    account_balance: this.AccountForm.value.account_balance
  }
  this._http.post(`http://127.0.0.1:8000/api/account/update/${this.user.id}`, formData)
  .subscribe((response:any)=>{
    console.log('Balance Added', response.status)
    console.log('check', response.balance);
    // location.reload();
  })
  

  console.log('amount', formData)
  this.visible = false;
 
 

}
saveAcct2(){
  const formData={
    account_balance: this.AccountForm.value.account_balance
  }
  this._http.put(`http://127.0.0.1:8000/api/account/reduce/${this.id}`, formData)
  .subscribe((response:any)=>{
    console.log('Balance reduced', response.status)
    console.log('check', response.balance);
    // location.reload();
  })
  

  console.log('amount', formData)
  this.visible = false;
 
 

}
SaveTransaction(){
  const formData2={
    userID: this.user.id,
    amount:this.AccountForm.value.account_balance,
    receivername:this.AccountForm.value.receivername,
    receiveracct:this.AccountForm.value.receiveracct, 
    description: 'Nill Description',
    transactionType: '+'
  }
  this._http.post(`http://127.0.0.1:8000/api/transaction`, formData2)
  .subscribe((response:any)=>{
    console.log('Transaction Added', response.status)
    
   
  })
  console.log('form', formData2);
   
}
SaveTransaction2(){
  const formData2={
    userID: this.id,
    amount:this.AccountForm.value.account_balance,
    receivername:this.AccountForm.value.receivername,
    receiveracct:this.AccountForm.value.receiveracct, 
    description: 'Nill Description',
    transactionType: '-'
  }
  this._http.post(`http://127.0.0.1:8000/api/transaction`, formData2)
  .subscribe((response:any)=>{
    console.log('Transaction Added', response.status)
    
   
  })
  console.log('form', formData2);
   
}
BoaxTransaction(){
  const formData2 = {
    userID: this.id,
    amount:this.AccountForm.value.account_balance,
    receivername:this.AcctName,
    receiveracct:this.AcctID.toLocaleString(), 
    description: 'Nill Description',
    transactionType: '-'
  }
  
  this._http.post(`http://127.0.0.1:8000/api/transaction`, formData2)
  .subscribe((response:any)=>{
    console.log('Transaction Added', response.status)
    
   
  })
  console.log('form1', formData2);
}
BoaxTransaction2(){
  const formData2={
    userID: this.AcctID,
    amount:this.AccountForm.value.account_balance,
    receivername:this.name,
    receiveracct:this.AcctID.toLocaleString(),
    description: 'Nill Description',
    transactionType: '+'
  }
  this._http.post(`http://127.0.0.1:8000/api/transaction`, formData2)
  .subscribe((response:any)=>{
    console.log('Transaction Added', response.status)
    
   
  })
  console.log('form2', formData2);
   
}

getUser(){
  this._http.get(`http://127.0.0.1:8000/api/register/get/${this.id}`).subscribe((response:any) => {
    this.singleresult = response.message.account_balance;
    this.user = response.message;
    this.resultbalance = response.message.account_balance.toLocaleString();
    console.log('single', this.user)
  });
}
getTransaction(){
  this._http.get(`http://127.0.0.1:8000/api/transaction/get/${this.id}`).subscribe((response:any) => {
    this.Transactions= response.message;
    
    for (const transaction of this.Transactions) {
      this.TransactionType = response.transactionType;
    this.TransactionDate = response.created_at;
      this.isConditionMet = transaction.transactionType.includes('+') || transaction.transactionType.includes('-');
    }
    console.log('Transaction', response.message)
  });
}
get AccountFormControls(){
  return this.AccountForm.controls;
}
}
