import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from '../menu/menu.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { AddUserComponent } from '../add-user/add-user.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      // {
      //   path: 'add-user',
      //   component: AddUserComponent
      // },
      {
        path: '',
        component: DataTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
