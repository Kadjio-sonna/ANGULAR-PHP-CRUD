import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Policy } from  './policy';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   PHP_API_SERVER = "http://127.0.0.1:8080";

  constructor(private httpClient: HttpClient) { }

  //Methode Read
  readPolicies(): Observable<Policy[]>{
    return this.httpClient.get<Policy[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  //Methode Create
  createPolicy(policy: Policy): Observable<Policy>{
    return this.httpClient.post<Policy>(`${this.PHP_API_SERVER}/api/create.php`, policy);
  }

  //Methode Update
  updatePolicy(policy: Policy){
    return this.httpClient.put<Policy>(`${this.PHP_API_SERVER}/api/update.php`, policy);   
  }

  //Methode Delete
  deletePolicy(id: number){
    return this.httpClient.delete<Policy>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}`);
  }
}
