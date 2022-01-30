import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from 'src/Data/appuser';
import { RegisterDto } from 'src/dto/RegisterDto';
import { AccountService } from 'src/Services/AccountService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm')RegisterForm!:NgForm;
  user=new RegisterDto();
  showMessage:any;

  constructor(private account:AccountService, private rout:Router ) { }

  ngOnInit(): void {
  }

  onCreate()
  {
    debugger;
    this.user.name=this.RegisterForm.value["txtName"];
    this.user.email= this.RegisterForm.value["txtEmail"];
    //this.user.password= this.RegisterForm.value["txtPassword"];
   // this.user.confirmPassword= this.RegisterForm.value["txtConfirm"];
    this.account.Register(this.user).subscribe(data=>
      { 
        debugger
        if(data.status=="Success")
         { 
          this.rout.navigate(["/login"]);
        }
        else
        {
          this.showMessage=data.message;
        }
      });
    
  }
}
