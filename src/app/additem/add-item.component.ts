import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ItemService } from 'src/app/services/ItemServices/item.service';
import { LoginService } from 'src/app/services/Login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemeService } from 'ng2-charts';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-item-cases',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  itemForm: FormGroup;
  @ViewChild("save") btnElement:ElementRef;
  isLoadingResults = false;
  userName:String;
  color:String;
  matcher = new MyErrorStateMatcher();
  officeTrslast :String ="No";
  categoryLabel :String =" Select Category";

  constructor(private router: Router,  public snackBar: MatSnackBar,private itemService: ItemService, private loginService:LoginService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.userName = sessionStorage.getItem("username");
    this.isLoadingResults = false;
    this.itemForm = this.formBuilder.group({
      rule: '',
      description: ['', [Validators.required, Validators.maxLength(500)]],
      quantity: ['', [Validators.required, Validators.maxLength(6),Validators.pattern("^[0-9]*$")]],
      dcinvoiceNo: ['', [Validators.required, Validators.maxLength(200)]],
      supplierName: ['', [Validators.required, Validators.maxLength(500)]],
      broughtBy: ['', [Validators.required, Validators.maxLength(500)]],
      securityName: ['', [Validators.required, Validators.maxLength(100)]],
      remarks: ['', [Validators.required, Validators.maxLength(600)]],
      make: ['', [Validators.required, Validators.maxLength(100)]],
      model: ['', [Validators.required, Validators.maxLength(100)]],
      serialno: ['', [Validators.required, Validators.maxLength(100)]],
      poNumber: ['', [Validators.required, Validators.maxLength(100)]],
      accessories: [''],
      otherdetails: [''],
      category:['',[Validators.required, Validators.maxLength(100)]],
      interOfficeTransfer:['No',[Validators.required, Validators.maxLength(100)]],
      receivedBy: ['', [Validators.required, Validators.maxLength(200)]]

  });
  }

  onFormSubmit() {
    if(this.isLoadingResults) return false;
    if(!this.loginService.getLogin() ) this.loginService.clearLogin();
     this.isLoadingResults = true;
     let itemDetails = this.itemForm.value;
     this.officeTrslast = itemDetails.interOfficeTransfer;
    this.itemService.saveItemDetails(itemDetails.description,itemDetails.quantity,itemDetails.dcinvoiceNo,itemDetails.supplierName,itemDetails.broughtBy,itemDetails.securityName,itemDetails.remarks, itemDetails.make,  itemDetails.model, itemDetails.serialno,
      itemDetails.poNumber, itemDetails.accessories,itemDetails.otherdetails,itemDetails.category,itemDetails.interOfficeTransfer,itemDetails.receivedBy )
      .subscribe((res: any) => {
          this.isLoadingResults = false;
          this.resetForm();
         // this.router.navigate(['/home']);
        
         this.displaySuccessMessage("Data saved successfully!","Close");
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
          this.displayErrorMessage("Sorry !Something went wrong","Close");
        });
  }

  selectCatgeory(){

    this.categoryLabel ="Category";
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

  public clear():void {

    this.isLoadingResults = false;
    this.itemForm.patchValue(  { description: "",
    quantity: "",
    dcinvoiceNo: "",
    supplierName: "",
    broughtBy: "",
    securityName: "",
    remarks: "",
    make: "",
    model: "",
    serialno: "",
    poNumber: "",
    accessories: "",
    otherdetails: "",
    category:"",
    interOfficeTransfer:this.officeTrslast,
    receivedBy: ""
  });
  
    
    }

    public resetForm():void {

      
      this.itemForm.reset(  { description: "",
      quantity: "",
      dcinvoiceNo: "",
      supplierName: "",
      broughtBy: "",
      securityName: "",
      remarks: "",
      make: "",
      model: "",
      serialno: "",
      poNumber: "",
      accessories: "",
      otherdetails: "",
      category:"",
      interOfficeTransfer:this.officeTrslast,
      receivedBy: ""
    
    });
    
      
      }


}
