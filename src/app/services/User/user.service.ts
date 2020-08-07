import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.url;
  constructor(private http: HttpClient) { }

  saveUserDetails( firstName:string,lastName:string , username:string,
       password:string, email:string, mobile:string): Observable<any> {
      return this.http.post<any>(`${this.url}registerUser`, { firstname: firstName,lastname:lastName,username:username, password:password,email:email,mobile:mobile});
  
  }
 updateUserDetails( userid:string,firstName:string,lastName:string , username:string,
    password:string, email:string, mobile:string): Observable<any> {
   return this.http.post<any>(`${this.url}registerUser`, { userid:userid,firstname: firstName,lastname:lastName,username:username, password:password,email:email,mobile:mobile});

}

 getUserDetails(userId:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}getitems\${userId}`);
  }

}
 