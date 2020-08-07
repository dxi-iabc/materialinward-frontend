import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ItemDetails } from  'src/app/ItemDetails';
import { ItemService } from 'src/app/services/ItemServices/item.service';
export interface IHero {
    id:Number;
    description:string;
    quantity:string;
    dcinvoiceNo:string;

    supplierName:string ;
    broughtBy:string;
    securityName:string;
    remarks:string;
}

@Component({
  selector: 'hero-root',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  displayedColumns = ['id', 'description', 'quantity', 'dcinvoiceNo', 'supplierName'];
  dataSource = new MatTableDataSource<ItemDetails>();
  isLoadingResults = false;
  isItemPresent:boolean =false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private itemService:ItemService
  ) { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

 
  }


  getItemDetails() {

    /* this.isLoadingResults = true;
    this.itemService.getItems().subscribe((data:ItemDetails[])=>{
      this.isLoadingResults = false;
      this.dataSource.data = data;
      if(data.length > 0) this.isItemPresent = true;
    });
   */
  }
}