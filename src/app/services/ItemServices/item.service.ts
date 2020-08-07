import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { ItemDetails } from 'src/app/ItemDetails'
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  url = environment.url;
  constructor(private http: HttpClient) { }
  
  saveItemDetails( description:string,quantity:string , dcinvoiceNo:string,
    supplierName:string , broughtBy:string, securityName:string, remarks:string,
     make:string,  model:string, serialno: string, poNumber: string, accessories : string,otherdetails: string, category: string, interOfficeTransfer : string,receivedBy : string
    ): Observable<any> {

      let data = {
        "description": description,
        "username": sessionStorage.getItem( 'username'),
        "quantity": quantity,
        "dcinvoiceNo": dcinvoiceNo,
        "supplierName": supplierName,
        "broughtBy": broughtBy,
        "securityName": securityName,
        "remarks": remarks,
        "make": make,
        "model": model,
        "serialNo": serialno,
        "category": category,
        "poNumber": poNumber,
        "receivedBy": receivedBy,
        "interOfficeTransfer": interOfficeTransfer,
        "otherDetails": otherdetails,
        "accessories": accessories

    
    }
     return this.http.post<any>(`${this.url}materialinward/create`, data);
  
  }
  updateItemDetails(id:Number, description:string,quantity:string , dcinvoiceNo:string,
    supplierName:string , broughtBy:string, securityName:string, remarks:string,
     make:string,  model:string, serialno: string, poNumber: string, accessories : string,otherdetails: string, category: string, interOfficeTransfer : string,receivedBy : string): Observable<any> {

      let data = {
        "description": description,
        "username": sessionStorage.getItem( 'username'),
        "quantity": quantity,
        "dcinvoiceNo": dcinvoiceNo,
        "supplierName": supplierName,
        "broughtBy": broughtBy,
        "securityName": securityName,
        "remarks": remarks,
        "make": make,
        "model": model,
        "serialNo": serialno,
        "category": category,
        "poNumber": poNumber,
        "receivedBy": receivedBy,
        "interOfficeTransfer": interOfficeTransfer,
        "otherDetails": otherdetails,
        "accessories": accessories

    
    }
      return this.http.put<any>(`${this.url}materialinward/${id}`, data);
  
  }
  deleteItemDetails( id:Number): Observable<any> {
      return this.http.delete<any>(`${this.url}materialinward/${id}`);
  
  }

  getItems(fromDate:String,toDate:String): Observable<ItemDetails[]> {
    return this.http.get<ItemDetails[]>(`${this.url}materialinward/search/${fromDate}/${toDate}`);
  }
  getItemsByUser(): Observable<ItemDetails[]> {
    let date = new Date();
    let currentDate = "";
    let month = date.getMonth() +  1 ;
    if(month >9  )
     currentDate = date.getFullYear() + "-" + month + "-" + date.getDate();
    else
    currentDate = date.getFullYear() + "-0" + month + "-" + date.getDate();
     
    var nextDate = new Date();
    var numberOfDaysToAdd = 1;
         nextDate.setDate(nextDate.getDate() + numberOfDaysToAdd);
         month = nextDate.getMonth() +  1 ;
         let aferDate = "";
         if(month >9  )
         aferDate = nextDate.getFullYear() + "-" + month + "-" + nextDate.getDate();
        else
        aferDate = nextDate.getFullYear() + "-0" + month + "-" + nextDate.getDate();
   
    let username = sessionStorage.getItem( 'username');
    const params = {
      "dateFrom": currentDate,
      "dateTo":   currentDate,
      "username": username,
        }

    return this.http.get<ItemDetails[]>(`${this.url}materialinward/search/${username}/${currentDate}/${aferDate}`, { params });
  }

  getItem(id:string): Observable<ItemDetails> {
    return this.http.get<ItemDetails>(`${this.url}materialinward/${id}`);
  }

}
 