import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/Data/department';
import { Employee } from 'src/Data/employee';
import { EmployeeService } from 'src/Services/EmployeeService';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  @ViewChild('f')EmployeeForm!:NgForm;
  filePath!:string;
  liDepartment !: Department[];
  empId!: number;
  employee!: any;
  btnStatus!:string;

  constructor(private empServ:EmployeeService,private arout:ActivatedRoute) { }

 ngOnInit(): void {
   debugger
   this.btnStatus="create"
   this.LoadDepartments();
    this.empId=this.arout.snapshot.queryParams["empId"]
    if(this.empId!=null)
       this.EditMode();

  }

  LoadDepartments()
  {
    this.empServ.GetAllDepartment().subscribe(data=>{
      this.liDepartment=data
    });
  }

  EditMode()
  {
    debugger;
    this.btnStatus="update"

    this.empServ.GetEmployeeById(this.empId).subscribe(emp=>{   
      this.employee=emp
     debugger;
     this.EmployeeForm.form.patchValue({
     "txtId":this.employee.id,
     "txtFirstName": this.employee.firstName,
     "txtLastName": this.employee.lastName,
     "txtEmail": this.employee.email,
     "txtPhone": this.employee.phone,
     "ddlStatus": this.employee.status,
     "txtGender": this.employee.gender,
     "txtBirthdate": this.employee.dateOfBirth,
     "txtJoinDate": this.employee.dateOfJoining,
     "ddlDepartment":this.employee.departmentId 
    })
  });
  }

  getFieldsVal()
  {
    debugger;
    var employee=new Employee();
    employee.id=this.EmployeeForm.value["txtId"];
    employee.firstName=this.EmployeeForm.value["txtFirstName"];
    employee.lastName=this.EmployeeForm.value["txtLastName"];
    employee.email=this.EmployeeForm.value["txtEmail"];
    employee.phone=this.EmployeeForm.value["txtPhone"];
    employee.status=this.EmployeeForm.value["ddlStatus"];
    employee.gender=this.EmployeeForm.value["txtGender"];
    employee.dateOfBirth=this.EmployeeForm.value["txtBirthdate"];
    employee.dateOfJoining=this.EmployeeForm.value["txtJoinDate"];
    employee.departmentId=this.EmployeeForm.value["ddlDepartment"];
    employee.photoPath=this.filePath;
    return employee;
  }

  onSave(){
    debugger;
    var emp=new Employee();
    emp=this.getFieldsVal();
    emp.id=0;
    this.empServ.Insert(emp);
  }

  onFileSelected(event:any){
    debugger;
    let selectedFile=event.target.files[0];
    let file=new FormData();
    file.append(selectedFile.name , selectedFile);
    this.empServ.UploadFile(file).subscribe(res=>    
      { 
        debugger;
        this.filePath="http://localhost/GlobitelSystem/Images/"+selectedFile.name
      })
  }

  onUpdate(){
    debugger;
    var emp=new Employee();
    emp=this.getFieldsVal();
    this.empServ.Update(emp);
  }
}
