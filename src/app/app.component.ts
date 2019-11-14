import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import { AuthService } from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, private translate: TranslateService) {
    translate.setDefaultLang('en_US');
  }
  title = 'fullstack';

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
