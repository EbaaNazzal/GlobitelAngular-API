import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Department } from "src/Data/department";

@Injectable()
export class DepartmentService{
    url :string='http://localhost/GlobitelSystem/api/Department';
    token=this.getToken();
    constructor(private httpClient: HttpClient){}
    
    getToken(){
      debugger
        let userInfo=JSON.parse(localStorage.getItem("userInfo")||'{}'); //read token value from localstorge and convert json
        const httpOptions ={//build head 
          headers:new HttpHeaders({//send token key named authorization
            'Content-Type':'application/json',//send data json
            Authorization:'Bearer '+userInfo?.token
          })
        }
        return httpOptions;
      }

    Insert(dept: Department){
        debugger;
        this.httpClient.post(this.url,dept,this.token).subscribe();
    }
    
    GetAllDepartment():Observable<any>{
        return this.httpClient.get(this.url,this.token);
    }

}