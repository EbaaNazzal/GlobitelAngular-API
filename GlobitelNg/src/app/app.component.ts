import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GlobitelNg';
  lang: any;
  
  ngOnInit(): void {
    this.lang=localStorage.getItem('lang')||'en';

  }

  constructor(private translateService:TranslateService){
    this.translateService.setDefaultLang('en');
    const lang=localStorage.getItem('lang')||'en';
    this.translateService.use(lang);
  }

  changeLang(lang:any)
  {
    localStorage.setItem('lang',lang.target.value);
    window.location.reload();
  }
  
  isLoggedIn(){
    if(localStorage.getItem("userInfo")==null)
    return false;
    else
    return true;
  }
}
