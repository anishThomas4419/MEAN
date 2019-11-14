import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map } from "rxjs/operators";
import { DataTableService } from "../../service/data-table.service";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [DataTableService]
})
export class DataTableComponent implements OnInit {
  @ViewChild('closeButton', {static: true}) closeButton: ElementRef;
  @ViewChild('filterButton', {static: true}) filterButton: ElementRef;
  userData: UserDataType[] = [];
  user = {};
  addDataInitiated = false;
  userDataModal = false;

  constructor(private dataTableService: DataTableService) { }

  ngOnInit() {
    this.fetchUserData();
    this.dataTableService.getUserFilterCriteria().subscribe(userCriteria => {
      this.dataTableService.filterUserData(userCriteria).subscribe((filteredResponse: UserDataType[]) => {
        console.log(filteredResponse);
        this.userData = filteredResponse;
      });
    });
  }
  fetchUserData() {
    this.dataTableService.fetchUserData()
    .pipe(map((userData:any)  => {
      return userData.map((data) => {
        return {
          ...data,
          id: data._id,
          creator: data.creator
        }
      });
    }))
    .subscribe((res: UserDataType[]) => {
      console.log(res);
      this.userData = res;
    })
  }

  addDataHandler() {
    this.addDataInitiated = true;
  }

  saveUserData(formData) {
    const formValue = formData.form.value;
    const forms: FormData = new FormData();
    forms.append("title" ,formValue.title);
    forms.append("keywords" ,formValue.keywords);
    forms.append("module" ,formValue.module);
    forms.append("publishedDate" ,new Date(formValue.publishDate).toLocaleDateString());
    forms.append("acceptedDate" ,new Date(formValue.acceptedDate).toLocaleDateString());
    forms.append("grade" ,formValue.grade);
    forms.append("teacher" ,formValue.teacher);
    forms.append("document" ,this.user['document']);
    const userJson: UserDataType = {
      title: formValue.title,
      keywords: formValue.keywords.split(' '),
      module: formValue.module,
      publishedDate: new Date(formValue.publishDate).toLocaleDateString(),
      acceptedDate: new Date(formValue.acceptedDate).toLocaleDateString(),
      grade: parseInt(formValue.grade),
      teacher: formValue.teacher,
      // document: new FormData(this.user['document'])
    };
    if(!this.userDataModal) {
      console.log(userJson)
      this.dataTableService.saveUserData(forms).subscribe((reponse: {userId: number}) => {
        this.userData.push({
          ...userJson,
          id: reponse.userId
        });
        this.userDataModal = false;
        this.closeButton.nativeElement.click();
      });
    }else{
      userJson.id = this.user['id'];
      this.dataTableService.updateUserData(userJson).subscribe((resp: any) => {
        const index = this.userData.findIndex(obj => obj.id === resp._id);
        this.userData[index] = userJson;
        this.userDataModal = false;
        this.closeButton.nativeElement.click();
      });
    }
  }

  resetDataTable() {
    this.fetchUserData();
    this.filterButton.nativeElement.click();
  }

  deleteUserData(data) {
    console.log(data);
    this.dataTableService.deleteUserData(data.id).subscribe(res => {
      this.userData = this.userData.filter(userData => userData.id !== data.id);
    })
  }

  editUserData(userData) {
    console.log(userData)
    this.user = userData;
    this.userDataModal = true;
  }

  hideUserModal () {
    if(this.userDataModal) {
      this.userDataModal = false;
    }
    this.user = {};
  }

  onFileUploadHandler(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.user['document'] = file;
  }

}

export interface UserDataType {
   
  id?: number;
  _id?: number;
  title: string,
  keywords: string[],
  module: string,
  publishedDate: string,
  acceptedDate: string,
  grade: number,
  teacher: string,
  document?: File
}
