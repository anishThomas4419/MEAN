import { Component, OnInit } from '@angular/core';
import { StatisticsService } from "../../service/statistics.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  statistics: any;
  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.statisticsService.fetchStatistics().subscribe(res => {
      this.statistics = res;
    })
  }

}
