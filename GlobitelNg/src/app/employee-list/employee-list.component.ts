import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Employee } from 'src/Data/employee';
import { ActiveEmployee } from 'src/dto/ActiveEmployee';
import { EmployeeService } from 'src/Services/EmployeeService';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  liEmp!:Employee[];
  fileName= 'ActiveEmployees.xlsx';
  activeEmp!:ActiveEmployee[];

  constructor(private empServ:EmployeeService ,private route:Router , private translateService:TranslateService) { }

  ngOnInit(): void {
    this.LoadEmployeesList();
}

LoadEmployeesList(){
  this.empServ.GetAllEmployee().subscribe(data=>{
    this.liEmp=data;
  });
}

OnDelete(id:number){
  debugger;

 this.empServ.delete(id).subscribe( d=>{
  this.empServ.GetAllEmployee().subscribe(data =>{
    this.liEmp = data;
   })
 });
}

OnEdit(id:number)
{
  debugger;
  this.route.navigate(['/dashboard/newemployee'],{queryParams:{"empId":id}});
}

exportexcel(): void
{
  debugger;
  this.empServ.GetActiveEmployees().subscribe(data=>{
    this.activeEmp=data;
  });

  const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(this.activeEmp,{header:["firstName","lastName","phone","email","gender",  "dateOfBirth","dateOfJoining","departmentName"]});
  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */  
  XLSX.writeFile(wb, this.fileName);

}
}
