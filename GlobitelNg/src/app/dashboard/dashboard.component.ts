import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lang: any;
  constructor(private rout:Router, private translateService:TranslateService){
    this.translateService.setDefaultLang('en');
    const lang=localStorage.getItem('lang')||'en';
    this.translateService.use(lang);
  }

  ngOnInit(): void {
    this.lang=localStorage.getItem('lang')||'en';

  }
  Logout()
  {
    localStorage.removeItem('userInfo');
    this.rout.navigate(["/login"]);
  }

  isLoggedIn(){
    if(localStorage.getItem("userInfo")==null)
    return false;
    else
    return true;
  }

  changeLang(lang:any)
  {
    localStorage.setItem('lang',lang.target.value);
    window.location.reload();
  }
}
