import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "src/Data/employee";

@Injectable()
export class EmployeeService{
    employee:any=new Employee();
    url :string='http://localhost/GlobitelSystem/api/Employee';
    token=this.getToken();

    constructor(private httpClient: HttpClient){}
    
    getToken(){
        let userInfo=JSON.parse(localStorage.getItem("userInfo")||'{}'); //read token value from localstorge and convert json
        const httpOptions ={//build head 
          headers:new HttpHeaders({//send token key named authorization
            'Content-Type':'application/json',//send data json
            Authorization:'Bearer '+userInfo?.token
          })
        }
        return httpOptions;
    }

    getToken2(){
        let userInfo=JSON.parse(localStorage.getItem("userInfo")||'{}'); //read token value from localstorge and convert json
        const httpOptions ={//build head 
          headers:new HttpHeaders({//send token key named authorization
            Authorization:'Bearer '+userInfo?.token
          })
        }
        return httpOptions;
    }

    GetAllDepartment():Observable<any>{
        debugger;
        return this.httpClient.get(this.url+'/GetAllDepartment',this.token);
    }

    Insert(emp: Employee){
        debugger;
        this.httpClient.post(this.url,emp,this.token).subscribe();
    }

    GetAllEmployee():Observable<any>{
        return this.httpClient.get(this.url+'/GetAllEmployee',this.token)
    }

    GetActiveEmployees():Observable<any>{
        return this.httpClient.get(this.url+'/GetActiveEmployees',this.token)
    }

    delete(id:number):Observable<any>{
        return this.httpClient.get(this.url+"/Delete/"+id,this.token);
    }

    UploadFile(file:FormData):Observable<any>{
        debugger;
        return this.httpClient.post(this.url+"/upload",file,this.getToken2());
    }

    GetEmployeeById(id:number):Observable<any>
    {
        //debugger;
        return this.httpClient.get(this.url+'/GetEmployeeById/'+id,this.token);
    }

    Export():Observable<any>{
        debugger;
     
        return this.httpClient.get(this.url+'/export',this.token);
    }

    Update(emp: Employee)
    {
        debugger;
        this.httpClient.post(this.url+'/Update',emp,this.token).subscribe();
    }
}