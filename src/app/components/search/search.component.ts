import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataTableService } from "../../service/data-table.service";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  user = {};
  @Output() resetEmitter = new EventEmitter();

  constructor(private dataTableService: DataTableService) { }

  ngOnInit() {
  }

  filterUsersTable(searchParams) {
    const filterCriteria = {
      title: !!searchParams.title? searchParams.title : '',
      keywords: !!searchParams.keywords ? searchParams.keywords : '',
      module: !!searchParams.module ? searchParams.module : '',
      publishDate: !!searchParams.publishDate ? new Date(searchParams.publishDate).toLocaleDateString() : '',
      acceptedDate: !!searchParams.acceptedDate ? new Date(searchParams.acceptedDate).toLocaleDateString() : '',
      grade: !!searchParams.grade ? parseInt(searchParams.grade) : '',
      teacher: !!searchParams.teacher ? searchParams.teacher : '',
    }
    this.dataTableService.onUserSearch(filterCriteria);
  }

  resetForm(searchForm) {
    searchForm.reset();
    this.user = {};
    this.resetEmitter.emit();
  }

}
