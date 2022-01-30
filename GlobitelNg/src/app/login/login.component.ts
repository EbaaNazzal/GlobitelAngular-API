import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginDto } from 'src/dto/LoginDto';
import { AccountService } from 'src/Services/AccountService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f')loginForm!:NgForm;
  showMessageError = false;
  user=new LoginDto();

  constructor(private accountService:AccountService , private rout:Router ,private translateService:TranslateService) { }

  ngOnInit(): void {
  }
  
  onLogin()
  {
    debugger;
    this.user.email= this.loginForm.value["txtEmail"];
    this.user.password= this.loginForm.value["txtPassword"];
    if(this.loginForm.valid)
    {
      this.accountService.Login(this.user).subscribe(data =>{
        debugger;
        this.showMessageError = false;
        localStorage.setItem("userInfo",JSON.stringify(data))
        if(localStorage.getItem("userInfo") != null)
          this.rout.navigate(["/dashboard/employeelist"]);
       
      },
      (err)=>{
        debugger;
        console.error(err)
        this.showMessageError = true;
      }
      );
    }
    else
    {
    this.showMessageError = true
    }
  }
}
