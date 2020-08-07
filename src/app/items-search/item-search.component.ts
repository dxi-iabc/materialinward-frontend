import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/services/Login/login.service';
import { ItemDetails } from  'src/app/ItemDetails';
import { ItemService } from 'src/app/services/ItemServices/item.service';
import {FormGroup, FormControl} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-cases-stat',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
  
})
export class ItemSearchComponent implements OnInit {

  displayedColumns = [ 'description', 'quantity', 'dcinvoiceNo', 'supplierName'];
  dataSource = new MatTableDataSource<ItemDetails>();
  isLoadingResults = false;
  startDate:Date;
  endDate:Date;
  userName:String;
  isItemPresent:boolean =false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private itemService:ItemService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem("username");
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    
  }

  changeEventStart(event){
    
    this.startDate = event.value;

  }

  changeEventEnd(event){
     
    this.endDate = event.value;

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayErrorMessage(message,action){

    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["red-snackbar"],
    });
  }

  getItemDetails() {

     this.isLoadingResults = true;
     if(this.startDate == null || this.startDate == undefined || this.startDate.toDateString() == "" ){
      this.isLoadingResults = false;
      this.displayErrorMessage("Enter Start date","close")
      return false;
     }

     if(this.endDate == null || this.endDate == undefined || this.endDate.toDateString() == "" ){
      this.isLoadingResults = false;
      this.displayErrorMessage("Enter End date","close")
      return false;
     }
    let fromDate;
    let month  = this.startDate.getMonth() + 1;
    if(month> 9 )
    fromDate= this.startDate.getFullYear() + "-" + month + "-" + this.startDate.getDate();
      else
    fromDate= this.startDate.getFullYear() + "-0" + month + "-" + this.startDate.getDate();
    let toDate;
    month  = this.endDate.getMonth() + 1;
    if(month> 9 )
    toDate= this.endDate.getFullYear() + "-" + month + "-" + this.endDate.getDate();
      else
      toDate= this.endDate.getFullYear() + "-0" + month + "-" + this.endDate.getDate();

    this.itemService.getItems(fromDate ,toDate).subscribe((data:ItemDetails[])=>{
      this.isLoadingResults = false;
      this.dataSource.data = data;
        
        if(data.length > 0) this.isItemPresent = true;
    });
   
  }
}
