import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { AppManagementService } from 'src/app/services/admin/app-management.service';
import { LanguagesService } from 'src/app/services/admin/languages.service';

@Component({
  selector: 'app-new-app-desc',
  templateUrl: './new-app-desc.component.html',
  styleUrls: ['./new-app-desc.component.scss']
})
export class NewAppDescComponent implements OnInit {
  saveloading: Boolean = false;
  appsList: any;
  langsList: any;
  appDesc: any = {
    createdBy: '',
    editBy: 'Ehab',
    appDesc: '',
    sysAppNode: {},
    sysLanguage: {}
  };
  appId: any;


  constructor(
    private appService: AppManagementService,
    private langService: LanguagesService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private locaiton: Location
  ) { }

  ngOnInit() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (this.route.parent.snapshot.paramMap.get('id')) {
      this.appId = this.route.parent.snapshot.paramMap.get('id');
    } else {
      this.appId = this.route.snapshot.paramMap.get('id');
    }
    // this.route.parent.params.subscribe(params => {
    //   this.appId = params.id;
    // });

    this.langService.getLanguages().subscribe(data => {
      this.getLangsList(data);
    });
  }

  getLangsList(langs) {
    this.langsList = [];
    langs.forEach(lang => {
      const langItem: any = { value: lang.id, label: lang.name };
      this.langsList.push(langItem);
    });
  }


  savaApp() {
    this.saveloading = true;
    this.appDesc.sysAppNode.id = this.appId;
    delete this.appDesc.createdDate;
    delete this.appDesc.editDate;
    this.appService.addAppDesc(this.appDesc, this.appId).subscribe(() => {
      this.saveloading = false;
      this.router.navigate(['/apps/details/' + this.appId]);
    }, error => {
      this.saveloading = false;
    });
  }

  cancel() {
    this.locaiton.back();
  }

}
