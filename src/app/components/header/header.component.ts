import { Component, OnInit, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Subscription } from "rxjs";

import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthenticated = false;
  private listenSub$: Subscription;
  constructor(private authService: AuthService,private translate: TranslateService) { }

  ngOnInit() {
    this.userAuthenticated = this.authService.getIsAuth();
    this.listenSub$ = this.authService.getAuthStatus().subscribe(isAuthenticated => {
      this.userAuthenticated = isAuthenticated;
    });
  }

  onLogOut() {
    this.authService.logOffUser();
  }

  toggleLanguage(event) {
    console.log(event.target.value)
    this.translate.use(event.target.value);
  }

  ngOnDestroy() {
    this.listenSub$.unsubscribe();
  }

}
