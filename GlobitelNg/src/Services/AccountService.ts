import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginDto } from "src/dto/LoginDto";
import { RegisterDto } from "src/dto/RegisterDto";

@Injectable()
export class AccountService{
    url :string='http://localhost/GlobitelSystem/api/Account';

    constructor(private httpClient: HttpClient){}

    Register(user: RegisterDto):Observable<any>
    {
        debugger;
        return this.httpClient.post(this.url+'/Register',user);
    }

    Login(user: LoginDto):Observable<any>{
        debugger;
        return this.httpClient.post(this.url+'/Login',user);
    }

    isLoggedIn(){
        const token = localStorage.getItem("userInfo");
        if(token != null){
        const payload = atob(token?.split('.')[1]);//decode payload of token
        const parsedPayload  = JSON.parse(payload); // convert payload into an Object
        return parsedPayload.exp > Date.now()/1000; //1000
      }
      return false
    }
}