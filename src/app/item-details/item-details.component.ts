import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ItemService } from 'src/app/services/ItemServices/item.service';
import { ItemDetails } from  'src/app/ItemDetails';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

 
  isLoadingResults = true;
  item:ItemDetails;
  userName:String;
  constructor(private route: ActivatedRoute,public snackBar: MatSnackBar,private itemService: ItemService,private router: Router) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem("username");
    this.itemService.getItem(this.route.snapshot.params.id).subscribe((item:ItemDetails)=>{
      this.item = item;
      this.isLoadingResults = false;
     
    });
  }

  

  deleteItem(id: any) {
    this.isLoadingResults = true;
    this.itemService.deleteItemDetails(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.displaySuccessMessage("Data deleted successfully!","Close")
          this.router.navigate(['/home']);
        }, (err) => {
          console.log(err);
          this.displaySuccessMessage("Sorry!Something went wrong","Close")
          this.isLoadingResults = false;
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

  formatDisplay(value){
   
    if(value == 'nonreturnable')

     return "Non Returnable";

     return "Returnable";
    
  }

}
