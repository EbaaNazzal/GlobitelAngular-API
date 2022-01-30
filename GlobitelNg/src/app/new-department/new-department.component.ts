import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from 'src/Data/department';
import { DepartmentService } from 'src/Services/DepartmentService';

@Component({
  selector: 'app-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.css']
})
export class NewDepartmentComponent implements OnInit {
  @ViewChild('f')departmentForm !:NgForm;
  
  constructor(private deptServ:DepartmentService) { }

  ngOnInit(): void {
  }

  onSave(){
    var department=new Department();
    department.name=this.departmentForm.value["txtName"];
    this.deptServ.Insert(department);
  }
}
