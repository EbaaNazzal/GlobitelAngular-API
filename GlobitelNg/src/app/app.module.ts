import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { NewDepartmentComponent } from './new-department/new-department.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from 'src/Services/EmployeeService';
import { DepartmentService} from 'src/Services/DepartmentService';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AccountService } from 'src/Services/AccountService';
import { LoginComponent } from './login/login.component';
import { AccountGuard } from './account.guard';
import {ConfirmEqualValidatorDirective} from'src/shared/confirm-equal-validator.directive'
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes=[{path:'',component:EmployeeListComponent,canActivate: [AccountGuard]},
{path:'dashboard',component:DashboardComponent,children: 
  [
   {path:'departmentlist',component:DepartmentListComponent,canActivate: [AccountGuard]},
   {path:'adddepartment',component:NewDepartmentComponent,canActivate: [AccountGuard]},
   {path:'newemployee', component:NewEmployeeComponent,canActivate: [AccountGuard]},
   {path:'employeelist', component:EmployeeListComponent,canActivate: [AccountGuard]}
  ],
},
{path:'register', component:RegisterComponent},
{path:'login',component:LoginComponent}
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NewEmployeeComponent,
    EmployeeListComponent,
    DepartmentListComponent,
    NewDepartmentComponent,
    RegisterComponent,
    LoginComponent,
    ConfirmEqualValidatorDirective,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [EmployeeService,
    DepartmentService,
    AccountService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
