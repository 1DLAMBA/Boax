import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import * as AOS from 'aos';
import { environment } from '../environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  baseUrl = environment.baseUrl;
  singleresult:any[]=[];
  topright:any='topright';
  AcctName: any[]=[];
  AcctID!: any;
  balance1: any[]=[];
  loader:boolean=true;
  AcctEmail: any[]=[];
  Transactions: any[]=[];
  TransactionType='';
  cardNumber:any;
  TransactionDate:any[]=[];
  email!: any;
  account_number:any;
  id!:any;
  balance!:any;
  name!:any;
  isConditionMet!:boolean;
  AccountForm: FormGroup;
  resultbalance: any;
  user: any;
  notificationmessage: any;
  transferin: any;
  constructor(private _http:HttpClient, 
    private readonly fb: FormBuilder,
    private router:Router,
    private spinnerService: NgxSpinnerService
    ){
    this.AccountForm = this.fb.group({
      account_balance: ['', [Validators.required]],
      receivername:[''],
      receiveracct:[''],
      description:[''],
      pin:[''],
      notificationmessage:['']
    })
  }
  visible: boolean = false;
  visible2:boolean = false;
  visible3:boolean = false;
  visible4:boolean = false;
  nocard:boolean = false;
  viewcard:boolean = false;
  createcard:boolean = false;
  notification:boolean = false;

    showDialog() {
        this.visible = true;
    }
    cardpush(){
      if(this.user.card_number){
        this.viewcardpush()
      }else{
        this.nocardpush()
      }
    }

    viewcardpush(){
      this.viewcard = true;

    }
    nocardpush(){
      this.nocard =true;
    }
    createcardpush() {
      this.createcard =true;
      this.nocard=false;
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
    AOS.init();
    setTimeout(()=>{
      
    },5000)
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

  deletetoggle(){
    this.notification=true;
    this._http.delete(`http://127.0.0.1:8000/api/clear/${this.user.id}`)
    .subscribe((response:any) => {
      console.log(response);
      
    })
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
      this.receivernotification();
      this.BoaxTransaction();
      this.BoaxTransaction2();
      this.visible4=false;
      Swal.fire(
        'Success',
        `Transaction of ${this.AccountForm.value.account_balance} to ${this.AcctName} Successful`,
        'success'
      ).then(()=>{
        this.spinnerService.show()
        this.getTransaction();
        this.getUser();
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
        `Transaction of ${this.AccountForm.value.account_balance} Successful`,
        'success'
      ).then(()=>{
        
        this.spinnerService.show()
        this.getTransaction();
        this.getUser();
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
        this.spinnerService.show()
        this.getTransaction();
        this.getUser();
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
      account_balance: this.AccountForm.value.account_balance,

    }
    this._http.post(`http://127.0.0.1:8000/api/account/update/${this.AcctID}`, formData)
    .subscribe((response:any)=>{
      console.log('Balance Added', response.status)
      // console.log('check', response.balance);
      // location.reload();
    })
    const NotificationFormData={
      userID:this.user.id,
      Message:`You sent ${this.AccountForm.value.account_balance} to ${this.AccountForm.value.receiveracct}`
    }
    this._http.post(`http://127.0.0.1:8000/api/notification`, NotificationFormData)
    .subscribe((response:any)=>{
      console.log('notification response', response)
      // console.log('check', response.balance);
      // location.reload();
    })
  console.log('notif form',NotificationFormData);


  }
saveAcct(){
  const formData={
    account_balance: this.AccountForm.value.account_balance,

  }
  this._http.post(`http://127.0.0.1:8000/api/account/update/${this.user.id}`, formData)
  .subscribe((response:any)=>{
    console.log('Balance Added', response.status)
    console.log('check', response.balance);
    // location.reload();
  })
  const NotificationFormData={
    userID:this.user.id,
    Message:`You sent ${this.AccountForm.value.account_balance} to ${this.AccountForm.value.receiveracct}`
  }
  this._http.post(`http://127.0.0.1:8000/api/notification`, NotificationFormData)
  .subscribe((response:any)=>{
    console.log('notification response', response)
    // console.log('check', response.balance);
    // location.reload();
  })
  console.log('notif form',NotificationFormData);
  
  

  console.log('amount', formData)
  this.visible = false;
 
 

}

receivernotification(){
  const formData2={
    userID: this.AcctID,
    Message:`You have received ${this.AccountForm.value.account_balance} from ${50930000000 +this.user.id}`
  }
  this._http.post(`http://127.0.0.1:8000/api/notification`, formData2)
  .subscribe((response:any)=>{
    console.log('notification response', response)
    // console.log('check', response.balance);
    // location.reload();
  })

}
saveAcct2(){
  const formData={
    account_balance: this.AccountForm.value.account_balance,
    notificationmessage: `You have sent ${this.AccountForm.value.account_balance} to ${this.AccountForm.value.receiveracct}`

  }
  this._http.post(`http://127.0.0.1:8000/api/account/reduce/${this.id}`, formData)
  .subscribe((response:any)=>{
    console.log('Balance reduced', response.status)
    console.log('check', response.balance);
    // location.reload();
  })
  

  console.log('amount', formData)
  this.visible = false;
 
 

}
// transferin(){
//   const formdata={
//     transfers: this.AccountForm.value.account_balance
//   }
//   this._http.post(`http://127.0.0.1:8000/api/transferin/${this.id}`, formdata)
//   .subscribe((response:any)=>{
//     console.log('transfer In', response.status)
//     // location.reload();
//   })
  
// }


transferout(){
  const formdata={
    transfers: this.AccountForm.value.account_balance
  }
  this._http.post(`http://127.0.0.1:8000/api/transferout/${this.id}`, formdata)
  .subscribe((response:any)=>{
    console.log('Transfer Out', response)
    // location.reload();
  })
  
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
    receivername:this.user.name,
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

createCard(){
  if(this.AccountForm.value.pin){

    const formData2 ={
      card_number:509300001234 + this.user.id,
      pin:this.AccountForm.value.pin
    }
    this._http.post(`http://127.0.0.1:8000/api/card/${this.id}`, formData2)
    .subscribe((response:any) => {
      console.log('card details', response)
      Swal.fire(
        'Success',
        `Card Created Successfully`,
        'success'
      ).then(()=>{
       location.reload()
      })
    })
  }
}

getUser(){
  this._http.get(`${environment.baseUrl}/register/get/${this.id}`)
  .subscribe((response:any) => {

    this.singleresult = response.message.account_balance;
    this.user = response.message;
    this.transferin=this.user.transferin.toLocaleString();
    this.account_number = 50930000000 + this.user.id;
    this.cardNumber = 509300001234 + this.user.id;
    this.resultbalance = response.message.account_balance.toLocaleString();
    console.log('single', this.user.notificationmessage);
    this.spinnerService.hide();
  });
  this._http.get(`http://127.0.0.1:8000/api/notification/get/${this.id}`)
  .subscribe((response:any) => {
   
    this.notificationmessage = response.notification;
    console.log('notification message', this.notificationmessage);
    this.spinnerService.hide();
  });
  
}
getTransaction(){
  this._http.get(`http://127.0.0.1:8000/api/transaction/get/${this.id}`).subscribe((response:any) => {
    this.Transactions= response.message;
    this.loader = false;
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
