import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ItemService } from 'src/app/services/ItemServices/item.service';
import { LoginService } from 'src/app/services/Login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemDetails } from '../ItemDetails';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {


  id:Number;
  isLoadingResults = true;
  matcher = new MyErrorStateMatcher();
  itemForm: FormGroup;
  userName:String;
  

  constructor(  private router:Router,private route: ActivatedRoute,public snackBar: MatSnackBar,private itemService: ItemService, private loginService:LoginService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem( 'username').trim() ;
    this.getCasesById(this.route.snapshot.params.id);
    this.itemForm = this.formBuilder.group({
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
      interOfficeTransfer:['',[Validators.required, Validators.maxLength(100)]],
      receivedBy: ['', [Validators.required, Validators.maxLength(200)]]

  });
  }

  getCasesById(id: any) {
    this.itemService.getItem(id).subscribe((data: ItemDetails) => {
      let item:ItemDetails = data;
      this.isLoadingResults = false;
      this.id = item.id;
      this.itemForm.setValue({
        description: item.description,
        quantity: item.quantity,
        dcinvoiceNo: item.dcinvoiceNo,
        supplierName: item.supplierName,
        broughtBy: item.broughtBy,
        securityName: item.securityName,
        remarks: item.remarks,
        make: item.make,
      model:item.model,
      serialno: item.serialNo,
      poNumber: item.poNumber,
      accessories: item.accessories,
      otherdetails: item.otherDetails,
      category:item.category,
      interOfficeTransfer:item.interOfficeTransfer,
      receivedBy: item.receivedBy

      });
    });
  }

  onFormSubmit() {
    if(this.isLoadingResults) return false;
    if(!this.loginService.getLogin() ) this.loginService.clearLogin();
     this.isLoadingResults = true;
     let itemDetails = this.itemForm.value;
    this.itemService.updateItemDetails(this.id, itemDetails.description,itemDetails.quantity,itemDetails.dcinvoiceNo,itemDetails.supplierName,itemDetails.broughtBy,itemDetails.securityName,itemDetails.remarks, itemDetails.make,  itemDetails.model, itemDetails.serialno,
      itemDetails.poNumber, itemDetails.accessories,itemDetails.otherdetails,itemDetails.category,itemDetails.interOfficeTransfer,itemDetails.receivedBy ).subscribe((res: any) => {
          this.displaySuccessMessage("Data updated successfully!","Close");
          this.isLoadingResults = false;

          this.router.navigate(['/item-details', this.id]);
       
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
          this.displayErrorMessage("Sorry !Something went wrong ","Close");
        }
      );
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
 home() {
    this.router.navigate(['/home', this.id]);
  }

}
