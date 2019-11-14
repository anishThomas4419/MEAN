import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  fetchStatistics() {
    return this.http.get('http://localhost:3000/api/statistics')
  }
}
