import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { UserDataType } from '../components/data-table/data-table.component';

@Injectable()
export class DataTableService {

  private userSearchInitiated: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  fetchUserData() {
    return this.http.get<{ userData: UserDataType[] }>('http://localhost:3000/api/userdata')
  }

  filterUserData(filterCriteria) {
    return this.http.get('http://localhost:3000/api/userdata?title=' + filterCriteria.title + '&keywords=' + filterCriteria.keywords + '&module=' +
      filterCriteria.module + '&publishedDate=' + filterCriteria.publishDate + '&acceptedDate=' + filterCriteria.acceptedDate + '&grade=' + filterCriteria.grade + '&teacher=' + filterCriteria.teacher);
  }

  saveUserData(userData) {
    return this.http.post('http://localhost:3000/api/userdata', userData);
  }

  deleteUserData(dataId) {
    return this.http.delete('http://localhost:3000/api/userdata/' + dataId);
  }

  updateUserData(userData) {
    return this.http.put('http://localhost:3000/api/userdata', userData);
  }

  onUserSearch(searchCriteria) {
    this.userSearchInitiated.next(searchCriteria);
  }

  getUserFilterCriteria() {
    return this.userSearchInitiated.asObservable();
  }
}
