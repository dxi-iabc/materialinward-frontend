import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginService } from 'src/app/services/Login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registartionForm: FormGroup;
  
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,  public snackBar: MatSnackBar, private loginService: LoginService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.registartionForm = this.formBuilder.group({
      username : [null, Validators.required],
      password : [null, Validators.required]
    });
  }
  get f() { return this.registartionForm.controls; }
  

  onSubmit(){
    

    // stop here if form is invalid
    if (this.registartionForm.invalid) {
        return;
    }
    this.isLoadingResults = true;


    
    this.loginService.getLoginUserDetails(this.f.username.value,this.f.password.value).subscribe((data)=>{
           
           this.isLoadingResults = false;
        
           sessionStorage.setItem('isLogged', 'true' );
           sessionStorage.setItem("role",data.role)
           sessionStorage.setItem('username',  this.f.username.value);
           this.displaySuccessMessage("User logged in successfully","Close");
           this.router.navigate(['/home']);
          
      },
      error => {
        this.isLoadingResults = false;
        this.displaySuccessMessage("Sorry! Invalid login details","Close");
      });
    
        /*this.loginService.getLoginDetails(this.f.username.value, this.f.password.value)
            .subscribe(
                data => {
                  this.isLoadingResults = false;
                  this.router.navigate(['/home']);
                },
                error => {
                  this.isLoadingResults = false;
                });*/
  }


  displaySuccessMessage(message,action){

    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["green-snackbar"],
    });
  }

  displayErrorMessage(message,action){

    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["red-snackbar"],
    });
  }


}
