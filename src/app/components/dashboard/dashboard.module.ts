import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateLoader , TranslateModule} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from '../menu/menu.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { SearchComponent } from '../search/search.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DataTableComponent,
    AddUserComponent,
    MenuComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    FormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
