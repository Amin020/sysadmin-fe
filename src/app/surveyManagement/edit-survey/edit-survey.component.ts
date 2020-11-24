import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyManagementService } from 'src/app/services/survey-management.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { isArray, isObject } from 'util';
import { DeactivateDialogService } from 'src/app/services/deactivate.dialog.service';
import { BuilderService } from 'src/app/builder/shared/services/builder/builder.service';
import { ToastrService } from 'ngx-toastr';
import { PreferencesService } from 'src/app/services/preferences.service';
import { LoaderService } from 'src/app/core/loader.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss']
})
export class EditSurveyComponent implements OnInit, OnDestroy {
  currentTab;
  selectedSurveyId: any;
  surveyData: any;
  validName: boolean; surveyLogo; surveyLogoPosition;
  modalRef: MDBModalRef;
  themeList = [
    'default', 'bootstrap', 'orange', 'darkblue', 'darkrose', 'stone', 'winter', 'winterstone'
  ];
  editForm: FormGroup;
  surveyBody; loading = false;
  survey; logo;
  editable = false;
  createOrView = 'create';
  departmentList = [];
  private reminderDayes: any = [];
  private userId: number;
  private surveyJson: object;
  backupSurveyModel; isCopy;
  userGroupData: any;
  optionsSelect = []; addedLanguagesList = []; translatedLanguagesList = [];
  weekly: boolean;
  surveyBackground;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '4rem',
    minHeight: '3rem',
    maxHeight: '9rem',
    // placeholder: 'Enter text here...',
    translate: 'no',
  };
  constructor(
    private route: ActivatedRoute,
    private preferencesService: PreferencesService,
    private loaderSerivce: LoaderService,
    private router: Router,
    private toastrService: ToastrService,
    private builderService: BuilderService,
    public deactivateDialogService: DeactivateDialogService,
    private suerveys: SurveyManagementService) {
    this.builderService._surveyModel$.subscribe((res) => {
      if (res) {
        this.surveyBody = res;
        if (this.editForm) {
          // this.currentPage = this.surveyBody.currentPage;
          this.editForm.get('title').setValue(this.surveyBody.title);
          this.editForm.get('description').setValue(this.surveyBody.description);
          this.editForm.get('completedSurveyTemplate').setValue(this.surveyBody.completedHtml);
          this.surveyBody['logoPosition'] = this.editForm.get('logoPosition').value;
        }
      }
      // this.surveyForm.setValue({
      //   "description": this.surveyBody['description'],
      //   "title": this.surveyBody['title'],
      //   "completedSurveyTemplate": this.surveyBody['completedSurveyTemplate'],
      // })
    });
  }
  ngOnInit() {
    this.getDepartmentList();
    localStorage.removeItem('surveyArray');
    this.initForm();
    this.route.params.subscribe(params =>
      [
        this.selectedSurveyId = params['id'],
        this.isCopy = params['copy']
      ]);
    /* setTimeout(()=>{
    },500) */
    this.getSelectedSurvey();
    this.userId = 1; // should be dynamic;
    this.surveyJson = {
      "createdBy": "test",
      "editBy": "test",
      "footer": "xx",
      "introduction": "",
      "user": 1
    };
    this.validName = false;
    this.retrieveUserPreferences();
    setTimeout(() => {
      this.currentTab = 'edit';
    }, 100);
    this.builderService.getLanguages().subscribe((res: any) => {
      this.optionsSelect = res;
      this.optionsSelect.forEach((lan, langIndex) => {
        if (langIndex === 1) {
          lan.aprv = 'default';
          this.addedLanguagesList.push({ nativeName: lan.nativeName, aprv: lan.aprv, value: true, hide: false });
          this.translatedLanguagesList.push({ nativeName: lan.nativeName, aprv: lan.aprv, value: true, hide: false });
          this.optionsSelect.splice(langIndex, 1);
        }
      });
      this.loaderSerivce.isLoading.next(false);
    });
  }

  changeLogoPosition() {
    this.surveyData['logoPosition'] = this.editForm.get('logoPosition').value;
    this.surveyData.surveyBody['logoPosition'] = this.editForm.get('logoPosition').value;
    this.surveyLogoPosition = this.editForm.get('logoPosition').value;
    // this.builderService.updateSurvey(this.surveyData);
  }
  canDeactivate(): Observable<boolean> | boolean {
    const currentOne = JSON.parse(localStorage.getItem('surveyArray'));
    const oldOne = JSON.parse(localStorage.getItem('surveyArrayOld'));
    const result = this.isEquivalent(currentOne, oldOne);
    if (!result) {
      const confirmVal = this.deactivateDialogService.confirm('unsaved Changes might be lost ,Do you want to continue ??');
      return confirmVal['value'];
    }
    return true;
  }

  retrieveUserPreferences() {
    this.preferencesService.findUserPreferencesByUser(this.userId).subscribe(
      (data: any) => {
        // this.userGroupData = data;
        this.editForm.get('emailInvitationTemplate').setValue(data["mailInvitationTemplate"]);
        this.logo = data.logo;
        this.surveyJson['logoPosition'] = data.logoPosition;
        // this.surveyForm.get('mailSurveyCompletion').setValue(data["mailSurveyCompletion"]);
        this.userGroupData = data["userGroups"];
        // setTimeout(() => {
        // }, 500)
        // this.getUserGroup();
      },
      err => {
        console.log("Error occured");
      }
    );
  }
  // @HostListener('window:beforeunload', ['$event'])
  // unloadHandler(event: Event) {
  //   // Your logic on beforeunload
  //   const currentOne = JSON.parse(localStorage.getItem('surveyArray'));
  //   const oldOne = JSON.parse(localStorage.getItem('surveyArrayOld'));
  //   event.returnValue = this.isEquivalent(currentOne, oldOne);
  //   (event.returnValue= false)
  // }

  isEquivalent(a, b) {
    if (this.editForm.dirty) {
      return false;
    }
    // Create arrays of property names
    if (a !== b && (a === null || b === null)) {
      return false;
    }
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
      return false;
    }
    for (let i = 0; i < a['pages'].length; i++) {
      let questions;
      if (a.pages[i]['name'] !== b.pages[i]['name']) {
        return false;
      } else {
        if (a.pages[i]['elements'] == null) {
          a.pages[i].elements = [];
        }
        questions = a.pages[i].elements;
      }

      // If values of same property are not equal,
      // objects are not equivalent
      // if (a[question].length !== b[question].length) {
      //   return false;
      // }

      for (let z = 0; z < questions.length; z++) {
        for (const key in questions[z]) {
          if (b.pages[i].elements[z]) {
            if (!a.pages[i].elements[z].hasOwnProperty(key)) {
              return false;
            } else {
              if (b.pages[i].elements[z][key] !== a.pages[i].elements[z][key]) {
                if (isArray(a.pages[i].elements[z][key])) {
                  if (a.pages[i].elements[z][key].length !== b.pages[i].elements[z][key].length) {
                    return false;
                  }
                  for (let index = 0; index < a.pages[i].elements[z][key].length; index++) {
                    for (const keyObjInsideQuest in a.pages[i].elements[z][key][index]) {
                      if (a.pages[i].elements[z][key][index][keyObjInsideQuest] !== b.pages[i].elements[z][key][index][keyObjInsideQuest]) {
                        return false;
                      }
                    }
                  }

                } else if (isObject(a.pages[i].elements[z][key])) {
                  for (const keyObjInsideQuest in a.pages[i].elements[z][key]) {
                    if (a.pages[i].elements[z][key][keyObjInsideQuest] !== b.pages[i].elements[z][key][keyObjInsideQuest]) {
                      return false;
                    }
                  }
                } else {
                  return false;
                }
              }
            }
          }
        }
      }
    }
    // If we made it this far, objects
    // are considered equivalent
    return true;
  }

  getDepartmentList() {
    this.builderService.getDepartmentList().subscribe((res: any) => {
      this.departmentList = res;
    });
  }

  navigateToDesign() {
    // this.router.navigate([{ outlets: { builder: `builder/design/${this.selectedSurveyId}` } }]);
    // this.router.navigateByUrl(`SurveyManagement/editSurvey/${this.selectedSurveyId}/builder/design/${this.selectedSurveyId}`);
  }

  initForm() {
    this.editForm = new FormGroup({
      department: new FormControl(Number),
      name: new FormControl('', [Validators.required]),
      title: new FormControl('survey1', [Validators.required]),
      status: new FormControl('INITIATED'),
      surveyType: new FormControl('SURVEY', [Validators.required]),
      surveytheme: new FormControl(''),
      totalGrade: new FormControl(0),
      totalTimer: new FormControl(0),
      public: new FormControl(false),
      autoRemindersMonthlyOccurrence: new FormControl(0),
      allowMultipleSubmissions: new FormControl(false),
      description: new FormControl(''),
      emailInvitationTemplate: new FormControl(''),
      completedSurveyTemplate: new FormControl('You have answered correctly {correctedAnswers} questions from {questionCount}.'),
      sendAutoReminders: new FormControl(false),
      userGroup: new FormControl(null),
      autoRemindersFrequency: new FormControl('WEEKLY'),
      autoRemindersWeeklyOccurrence: new FormControl(null),
      autoRemindersDayOfMonth: new FormControl(null),
      logoPosition: new FormControl('-webkit-left'),
      logoStyle: new FormControl({ height: 150, width: 150 }),
      logoStyleWidth: new FormControl(150),
      logoStyleHeight: new FormControl(150)
    });
  }

  checkIfSurveyExist(surveyBody) {
    if (surveyBody == null) {

      surveyBody = {
        mode: "display",
        title: this.surveyData.title,
        id: this.selectedSurveyId,
        description: '',
        completedHtml: '',
        pages: [
          {
            name: "page1",
            elements: [

            ]
          }
        ]
      };
    }
    // this.suerveys.updateSurveyBody(surveyBody);
    return surveyBody;
  }

  reflectOnSurveyModel() {
    this.surveyBody.title = this.editForm.get('title').value;
    this.surveyBody.description = this.editForm.get('description').value;
    this.surveyBody.completedHtml = this.editForm.get('completedSurveyTemplate').value;
    // Survey
    //   .StylesManager
    //   .applyTheme(this.surveyBody['surveytheme']);
    this.saveSurveyObj();
  }

  saveSurveyObj() {
    const surveyLStorage = JSON.parse(localStorage.getItem('surveyArray'));
    surveyLStorage.title = this.surveyBody.title;
    surveyLStorage.description = this.surveyBody.description;
    surveyLStorage.completedHtml = this.surveyBody.completedHtml;
    localStorage.setItem('surveyArray', JSON.stringify(surveyLStorage));
    // const survey = this.builderService.makeSurveyModel(surveyLStorage);
    // survey.onElementEdit.fire(this);
  }

  mapSurveyData(data) {
    this.deserializeSurveyBody(data);
    this.surveyData = data;
    this.builderService.makeSurveyModel(this.surveyData["surveyBody"]);
    this.builderService.surveyModel['logo'] = this.logo;
    this.builderService.surveyModel['logoStyle'] = this.editForm.get('logoStyle').value;
    this.builderService.surveyModel['background'] = `url(${this.surveyBackground})`;
    this.builderService.surveyModel['logoPosition'] = this.editForm.get('logoPosition').value;
    this.builderService.updateSurvey(this.builderService.surveyModel);
    if (this.surveyData.status === 'INITIATED') {
      this.editable = true;
    } else {
      this.editable = false;
    }
    delete this.surveyData["createdDate"];
    delete this.surveyData["editDate"];
    this.logo = data.logo;
    this.surveyData["surveyBody"] = this.checkIfSurveyExist(this.surveyData["surveyBody"]);
    this.surveyJson["userGroup"] = this.surveyData["userGroup"];
    const objCopy = _.cloneDeep(this.surveyData["surveyBody"]);
    this.reminderDayes = this.surveyData.autoRemindersDays ? this.surveyData.autoRemindersDays : <any>[];
    localStorage.setItem('surveyArray', JSON.stringify(this.surveyData["surveyBody"]));
    localStorage.setItem('surveyArrayOld', JSON.stringify(objCopy));
    this.backupSurveyModel = this.surveyData["surveyBody"];
  }

  setForm(data) {
    this.editForm.setValue({
      department: data.department.id,
      name: data.name,
      title: data.title,
      status: data.status,
      surveyType: data.surveyType,
      surveytheme: data.surveytheme,
      public: data.public,
      userGroup: data.userGroup.name,
      totalGrade: data.totalGrade,
      totalTimer: data.totalTimer,
      autoRemindersMonthlyOccurrence: data.autoRemindersMonthlyOccurrence,
      allowMultipleSubmissions: data.allowMultipleSubmissions,
      description: data.description,
      emailInvitationTemplate: data.emailInvitationTemplate,
      completedSurveyTemplate: data.completedSurveyTemplate,
      sendAutoReminders: data.sendAutoReminders,
      autoRemindersFrequency: data.autoRemindersFrequency,
      autoRemindersWeeklyOccurrence: data.autoRemindersWeeklyOccurrence,
      autoRemindersDayOfMonth: data.autoRemindersDayOfMonth,
      logoPosition: data.logoPosition,
      logoStyle: data.logoStyle ? data.logoStyle : { height: 150, width: 150 },
      logoStyleWidth: data.logoStyle ? data.logoStyle['width'] : 150,
      logoStyleHeight: data.logoStyle ? data.logoStyle['height'] : 150,
    });
    this.surveyBackground = data.surveyBackground;
    this.surveyLogo = data.logo;
    this.surveyLogoPosition = data.logoPosition;
  }

  getTotalGrade() {
    this.surveyBody['maxTimeToFinish'] = this.editForm.get('totalTimer').value;
  }

  getSelectedSurvey() {
    this.suerveys.getSurveyById(this.selectedSurveyId).subscribe(
      (data: any) => {
        if (data != null) {
          this.mapSurveyData(data);
          this.setForm(data);
        } else {
          const obj = {
            mode: "display",
            title: 'survey1',
            description: '',
            completedHtml: '',
            id: 0,
            pages: [
              {
                name: 'page1',
                elements: [

                ]
              }
            ]
          };
          localStorage.setItem('surveyArray', JSON.stringify(obj));
          localStorage.setItem('surveyArrayOld', JSON.stringify(obj));
          this.mapSurveyData(obj);
        }
      },
      error => { }
    );
  }


  goTosurveyList() {
    this.router.navigate(['SurveyManagement']);
  }

  onDayChange(event) {
    const name = event.target.control.name;
    const val = event.target.control["checked"];
    if (val === false) {
      this.reminderDayes.push(name);
    } else {
      const index = this.reminderDayes.indexOf(name);
      if (index > -1) {
        this.reminderDayes.splice(index, 1);
      }
    }
  }

  getUserGroup() {
    setTimeout(() => {
      this.userGroupData.filter((x, index) => {
        if (x.name === this.surveyJson["userGroup"]['name']) {
          this.surveyJson["userGroup"] = this.userGroupData[index];
        }
      });
    }, 100);
  }

  onSelectGroup(event) {
    const index = this.userGroupData.findIndex((element) => {
      return event === element.name;
    });
    this.surveyJson["userGroup"] = this.userGroupData[index];
  }

  isChecked(day) {
    if (!this.reminderDayes) {
      return false;
    }
    return this.reminderDayes.includes(day);
  }

  UpdateSurvey(form) {
    this.loading = true;
    if (this.reminderDayes.length > 0) {
      this.surveyJson["autoRemindersDays"] = this.reminderDayes;
      form["value"].autoRemindersDays = this.reminderDayes;
    }
    if (!form["value"]["public"]) {
      if (!this.surveyJson["userGroup"]) {
        this.toastrService.error('If your survey private , so please choose a team');
        this.loading = false;
        return true;
      }
    } else {
      this.surveyJson["userGroup"] = {};
    }
    const reminderDateSection = this.validateReminderDate(form);
    if (!reminderDateSection) {
      this.toastrService.error('Check Reminder Date section , validate days/months');
      this.loading = false;
      return true;
    }
    const oldObj = this.surveyJson['userGroup'];
    this.surveyJson = Object.assign({}, this.surveyJson, form["value"]);
    if (!this.editForm.valid) {
      this.validName = true;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    this.createOrUpdate(oldObj);
  }

  validateReminderDate(form) {
    if (form["value"]['sendAutoReminders']) {
      if (form["value"]['autoRemindersFrequency'] === 'WEEKLY') {
        return true ? form['value']['autoRemindersWeeklyOccurrence'] >= '0' && this.reminderDayes.length > 0 : false;
      } else if (form["value"]['autoRemindersFrequency'] === 'MONTHLY') {
        return true ? form['value']['autoRemindersMonthlyOccurrence'] && form['value']['autoRemindersDayOfMonth'] : false;
      }
    }
    return true;
  }

  makeJSONToServer(oldObj) {
    this.surveyJson['surveyBody'] = JSON.parse(localStorage.getItem('surveyArray'));
    // var surveyBodyJson = JSON.stringify(this.surveyJson['surveyBody']);
    // surveyBodyJson = surveyBodyJson.replace("\"", "\\\\\"")
    // this.surveyJson['status'] = "CLOSED";
    // this.surveyJson['surveyBody'] = surveyBodyJson;
    this.surveyJson['user'] = { id: JSON.parse(localStorage.getItem('userData'))['id'] };
    this.surveyJson['editBy'] = 'qeqw';
    this.surveyJson['userGroup'] = oldObj;
    this.surveyJson['logo'] = this.logo;
    this.surveyJson['logoStyle']['height'] = this.editForm.get('logoStyleHeight').value;
    this.surveyJson['logoStyle']['width'] = this.editForm.get('logoStyleWidth').value;
    // this.surveyJson['logoPosition'] = '-webkit-center';
    this.surveyJson['surveytheme'] = this.editForm.get('surveytheme').value;
    this.surveyJson['department'] = { id: this.editForm.get('department').value };
    this.surveyJson['surveyBackground'] = this.surveyBackground;
    return JSON.stringify(this.surveyJson);
  }

  updateSurveyApi(convertToJson) {

    this.suerveys.updateSurveyById(this.selectedSurveyId, convertToJson).subscribe(
      (data: any) => {
        this.editForm.reset();
        this.loading = false;
        this.deserializeSurveyBody(data);
        this.mapSurveyData(data);
        this.setForm(data);
        this.toastrService.success('Data Saved Successfully');
        // this.router.navigate(['SurveyManagement']);
      },
      error => {
        this.loading = false;
      });
  }

  createSurveyApi() {
    this.loading = true;
    this.surveyJson['surveyBody'] = JSON.parse(localStorage.getItem('surveyArray'));
    // var surveyBodyJson = JSON.stringify(this.surveyJson['surveyBody']);
    // surveyBodyJson = surveyBodyJson.replace("\"", "\\\\\"")
    // this.surveyJson['surveyBody'] = surveyBodyJson;
    this.surveyJson['autoRemindersDayOfMonth'] = Number(this.surveyJson['autoRemindersDayOfMonth']);
    this.surveyJson['autoRemindersDays'] = this.reminderDayes;
    this.surveyJson['logo'] = this.logo;
    const convertToJson = JSON.stringify(this.surveyJson);
    this.suerveys.addNewSurvey(this.surveyJson).subscribe(
      data => {
        this.loading = false;
        this.editForm.reset();
        this.router.navigate(['SurveyManagement']);
        this.toastrService.success(this.surveyJson['name'] + ' Created Successfully');
      },
      error => {
        this.loading = false;
      }
    );
  }

  copySurvey() {
    this.suerveys.addNewSurvey(this.surveyJson).subscribe(
      data => {
        this.router.navigate(['SurveyManagement']);
      },
      error => { }
    );
  }

  createOrUpdate(oldObj) {
    const convertToJson = this.makeJSONToServer(oldObj);
    if (+this.selectedSurveyId === 0) {
      this.createSurveyApi();
    } else if (this.isCopy) {
      this.copySurvey();
    } else {
      this.updateSurveyApi(convertToJson);
    }
  }

  deserializeSurveyBody(data) {
    this.surveyData = data;
    if (this.surveyData['surveyBody']) {
      if (this.surveyData['surveyBody']['title']) {
      } else {
        // this.surveyData['surveyBody'] = this.surveyData['surveyBody'].replace(/\\/g, "");
        // const v1 = JSON.parse(data.surveyBody);
        // this.surveyData['surveyBody'] = v1;
        localStorage.setItem('surveyArray', JSON.stringify(this.surveyData['surveyBody']));
        localStorage.setItem('surveyArrayOld', JSON.stringify(this.surveyData['surveyBody']));
      }
    }
  }

  onSelectLogo(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (dataEvent) => { // called once readAsDataURL is completed
        this.logo = dataEvent.target["result"];
        this.surveyData['surveyLogo'] = dataEvent.target["result"];
        this.surveyData.surveyBody['surveyLogo'] = this.surveyLogo;
        // this.builderService.updateSurvey(this.surveyData);
        // this.builderService.updateSurvey(new Survey.Model(this.surveyData.surveyBody))
      };
    }
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (dataEvent) => { // called once readAsDataURL is completed
        this.surveyBackground = dataEvent.target["result"];
        this.surveyData['surveyBackground'] = dataEvent.target["result"];
        this.surveyData.surveyBody['background'] = this.surveyBackground;
        // this.builderService.updateSurvey(new Survey.Model(this.surveyData.surveyBody))
      };
    }
  }

  ngOnDestroy() {
    this.canDeactivate();
  }
  // setValidators(){
  //   if(!this.editForm['value'].public){
  //     this.editForm.controls['public'].setValidators([Validators.required]);
  //   }
  // }
}
