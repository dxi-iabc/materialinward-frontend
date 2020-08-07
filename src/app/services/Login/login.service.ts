import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders ,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  public   isLogedIn :boolean;
  public   userRole : string;
  public   username: string;
  public   url = environment.url;
  
  constructor(private route: Router,private http: HttpClient) {


   }

   getLoginUserDetails(username,password): Observable<any> {
   
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    myheader.set('Accept', 'application/json')
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);
    return  this.http
      .get( "http://34.69.202.126:8080/materialinward/login/"+username+"/"+password, {
        headers: myheader
      });
  

  
  }

  public getLogin(): boolean {
  
    return Boolean(sessionStorage.getItem( 'isLogged' ));

    

  }

  public clearLogin():void {
    
   sessionStorage.removeItem('isLogged');
   sessionStorage.removeItem('username');
   this.route.navigateByUrl('/login');
    

  }
  
  public getLoginDetails(username:string, userPassword:string):Observable<boolean>{

    this.getLoginUserDetails(username,userPassword).subscribe((data)=>{
     
    });
  
     this.username = username;
     this.userRole = "guest";
     this.isLogedIn = true;
     sessionStorage.setItem( 'isLogged', 'true' );
     sessionStorage.setItem( 'username',  this.username );
     let rtValue :Observable<boolean> = new Observable(observer => {
      observer.next(true);
      observer.complete();
  });
     return rtValue;
  }

  

}
 