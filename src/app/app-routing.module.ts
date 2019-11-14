import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {LoginComponent} from './components/auth/login/login.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import { AuthGurad } from './service/auth.guard';
import { StatisticsComponent } from './components/statistics/statistics.component';



const routes: Routes = [
  {path: 'home', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGurad]  },
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignupComponent},

  {
    path: 'statistics',
    component: StatisticsComponent
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TranslateModule],
  exports: [RouterModule],
  providers: [AuthGurad]
})
export class AppRoutingModule { }
