import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/Login/login.service';
import { ItemDetails } from  'src/app/ItemDetails';
import { ItemService } from 'src/app/services/ItemServices/item.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['poNumber', 'quantity', 'dcinvoiceNo','supplierName'];
  data: ItemDetails[] = [];
  isLoadingResults = true;
  isItemPresent:boolean =false;
  userName:String;
  role:String;
  constructor(private loginService: LoginService, private itemService:ItemService) { }

  ngOnInit(): void {
    this.isItemPresent = false;
    this.isLoadingResults = false;
    this.role = sessionStorage.getItem("role");
    this.userName = sessionStorage.getItem( 'username').trim() ;
    this.itemService.getItemsByUser().subscribe((data:ItemDetails[])=>{
      this.isLoadingResults = false;
      this.data = data;
     
      if(data.length > 0) this.isItemPresent = true;
    });

  }

  logOut(){

    this.loginService.clearLogin()
  }

}
