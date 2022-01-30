import { Department } from "./department";

export class Employee{
    id !:number;
    firstName !:string;
    lastName !:string;
    phone !:string;
    email !:string;
    gender !:string;
    status !:string;
    dateOfBirth !:Date;
    dateOfJoining !:Date;
    departmentId !:number;
    photoPath!:string;
    department!:Department;
}