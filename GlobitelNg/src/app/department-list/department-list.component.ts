import { Component, OnInit } from '@angular/core';
import { Department } from 'src/Data/department';
import { DepartmentService } from 'src/Services/DepartmentService';
import { EmployeeService } from 'src/Services/EmployeeService';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  liDepartment!:Department[];
  constructor(private deptService:DepartmentService) { }

  ngOnInit(): void {
    this.deptService.GetAllDepartment().subscribe(data=>{
      this.liDepartment=data;
  });
  }

}
