import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesUrl = 'http://localhost:8080/api/v1/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }

  createEmployee(employee: Employee): Observable<Object>{
    return this.http.post(`${this.employeesUrl}`, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.http.put(`${this.employeesUrl}/${id}`, employee);
  }

  getEmployeeByID(id: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.employeesUrl}/${id}`);
  }

  deleteEmployeeById(id: number): Observable<Object>{
    return this.http.delete(`${this.employeesUrl}/${id}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
