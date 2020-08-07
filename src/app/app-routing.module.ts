import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemSearchComponent } from './items-search/item-search.component';
import { AddItemComponent } from './additem/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/Login/login.guard';
import {HeroComponent} from './hero/hero.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ LoginGuard ],
    data: { title: 'Items Home' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'hero',
    component: HeroComponent,
    data: { title: 'Login' }
  },

  
  {
    path: 'item-details/:id',
    component: ItemDetailsComponent
  },
  {
    path: 'item-search',
    component: ItemSearchComponent
  },
  {
    path: 'add-item',
    component: AddItemComponent,
    canActivate: [ LoginGuard ]
  },
  {
    path: 'edit-item/:id',
    component: EditItemComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
