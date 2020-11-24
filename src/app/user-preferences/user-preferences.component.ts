import { Component, OnInit, EventEmitter, ɵConsole, ViewEncapsulation } from '@angular/core';
import { UploadFile, UploadInput, humanizeBytes, UploadOutput } from 'ng-uikit-pro-standard';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PreferencesService } from '../services/preferences.service';
import { LoaderService } from '../core/loader.service';
@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss'],
  providers: [PreferencesService],
  encapsulation: ViewEncapsulation.None

})
export class UserPreferencesComponent implements OnInit {
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  private userPreference: {};
  submitted: boolean;
  private UserId: string;
  private userData: any;
  private updateForm = false;
  public sucess = false;
  public sucessMessage: string;
  editedGroup: object;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '4rem',
    minHeight: '3rem',
    maxHeight: '9rem',
    placeholder: 'Enter text here...',
    translate: 'no',
  };
  data = {
    userGroups: [
      {
        name: new FormControl('', [Validators.required]),
        invitedUsers: [{
          email: new FormControl('', [Validators.required, Validators.email]),
          firstName: new FormControl('', [Validators.required]),
          lastName: new FormControl('', [Validators.required]),
          midName: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required])
        }]
      }
    ]
  };

  productForm: FormGroup;
  url: any;

  constructor(private fb: FormBuilder, private preferencesService: PreferencesService, private loaderSerivce: LoaderService) {
    this.productForm = this.fb.group({
      mailInvitationTemplate: "",
      mailSurveyCompletion: "",
      logo: "",
      userGroups: this.fb.array([]),
      logoPosition: '-webkit-left'
    });
    this.setGroups();
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    if (document.getElementById('messageBox')) {
      document.getElementById('messageBox').classList.add('fadeOut');
    }
    this.updateForm = false;
    this.submitted = false;
    this.userPreference = {
      "createdBy": "test",
      "editBy": "test",
      "user": 1, // should be dynamic
    };
    this.groups();
    this.findUserPreferences();
  }
  groups() {
    return this.productForm.get("userGroups");
  }
  setGroups() {
    const control = <FormArray>this.productForm.controls.userGroups;
    this.data["userGroups"].forEach(x => {
      control.push(this.fb.group({
        name: x.name,
        invitedUsers: this.setinvitedUsers(x)
      }));
    });
  }
  setinvitedUsers(x) {
    const arr = new FormArray([]);
    x.invitedUsers.forEach(y => {
      arr.push(this.fb.group({
        email: y.email,
        firstName: y.firstName,
        lastName: y.lastName,
        midName: y.midName,
        password: y.password,
      }));
    });
    return arr;
  }

  initUser() {
    return this.fb.group({
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      midName: new FormControl(''),
      password: new FormControl('')
    });
  }

  addNewGroup() {
    const control = <FormArray>this.productForm.controls.userGroups;
    control.push(
      this.fb.group({
        name: '',
        // nested form array, you could also add a form group initially
        invitedUsers: this.fb.array([this.initUser()])
      })
    );
  }
  updateUserGroups() {
    const control = <FormArray>this.productForm.controls.userGroups;
    control.controls.length = 0;
    this.userData["userGroups"].forEach(x => {
      control.push(this.fb.group({
        name: x.name,
        invitedUsers: this.setinvitedUsers(x)
      }));
    });
  }
  addNewUser(control) {
    control.push(this.initUser());
  }
  deleteUser(control, index) {
    control.removeAt(index);
  }
  deleteGroup(index) {
    const control = <FormArray>this.productForm.controls.userGroups;
    control.removeAt(index);
  }

  SendUserPreferences() {
    if (this.productForm) {
      this.submitted = true;
      this.productForm["value"]["logo"] = this.url;
      this.userPreference = Object.assign({}, this.userPreference, this.productForm.value);
      this.preferencesService.sendUserPreferences(this.userPreference).subscribe(
        data => {
          if (data) {
            localStorage.setItem('id', data["id"]);
            this.UserId = data["id"];
            this.sucess = true;
            if (document.getElementById('messageBox')) {
              document.getElementById('messageBox').classList.add('fadeIn');
              document.getElementById('messageBox').classList.remove('fadeOut');
            }
            this.sucessMessage = "Congratulation Form Submitted Sucessfully ";
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            setTimeout(() => {
              this.sucess = false;
              if (document.getElementById('messageBox')) {
                document.getElementById('messageBox').classList.remove('fadeIn');
                document.getElementById('messageBox').classList.add('fadeOut');
              }
              this.findUserPreferences();
            }, 5000);
          }
        },
        err => {
          console.log("Error occured");
        });
    } else {
      this.submitted = false;
      document.body.scrollTop = document.documentElement.scrollTop = 150;
    }

  }

  retrieveUserPreferences() {
    this.preferencesService.retrieveUserPreferences(this.UserId).subscribe(
      data => {
        this.userData = data;
        delete this.userData.createdBy;
        delete this.userData.createdDate;
        delete this.userData.editBy;
        delete this.userData.editDate;
        delete this.userData.id;
        delete this.userData.user;
        this.productForm.setValue(this.userData);
      },
      err => {
        console.log("Error occured");
      });
  }
  updateUserData() {
    if (this.productForm.valid) {
      this.submitted = true;
      this.productForm["value"]["logo"] = this.url;
      this.userPreference = Object.assign({}, this.userPreference, this.productForm.value);
      this.userPreference['user'] = { id: 1 };
      this.preferencesService.updateXUserPreferences(this.userPreference, this.userPreference["user"].id).subscribe(
        data => {
          this.sucess = true;
          if (document.getElementById('messageBox')) {
            document.getElementById('messageBox').classList.add('fadeIn');
            document.getElementById('messageBox').classList.remove('fadeOut');
          }
          this.sucessMessage = "Congratulation Form Updated Sucessfully ";
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          setTimeout(() => {
            this.sucess = false;
            if (document.getElementById('messageBox')) {
              document.getElementById('messageBox').classList.remove('fadeIn');
              document.getElementById('messageBox').classList.add('fadeOut');
            }
            this.findUserPreferences();
          }, 5000);
        },
        err => {
          console.log("Error occured");
        });
    } else {
      this.submitted = false;
      document.body.scrollTop = document.documentElement.scrollTop = 150;
    }

  }

  findUserPreferences() {
    this.submitted = true;
    this.preferencesService.findUserPreferencesByUser(this.userPreference["user"]).subscribe(
      data => {
        if (data) {
          this.UserId = data["id"];
          this.userData = data;
          delete this.userData.createdBy;
          delete this.userData.createdDate;
          delete this.userData.editBy;
          delete this.userData.editDate;
          delete this.userData.id;
          delete this.userData.user;
          this.updateUserGroups();
          this.productForm["mailInvitationTemplate"] = this.userData["mailInvitationTemplate"];
          this.productForm["mailSurveyCompletion"] = this.userData["mailSurveyCompletion"];
          // this.productForm['logoPosition']=this.userData["logoPosition"];
          this.productForm["logo"] = this.userData["logo"];
          this.url = this.userData["logo"];
          this.productForm.patchValue({
            mailInvitationTemplate: this.userData["mailInvitationTemplate"],
            mailSurveyCompletion: this.userData["mailSurveyCompletion"],
            logo: this.url,
          });
          document.getElementById('formSubmittion').innerHTML = "Update";
          this.updateForm = true;
        } else {
          this.UserId = null;
        }
        this.loaderSerivce.isLoading.next(false);
      },
      error => {
        console.log("Error occured");
      }
    );
  }
  sendUserData() {
    if (!this.updateForm) {
      this.SendUserPreferences();
    } else {
      this.updateUserData();
    }
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (e) => { // called once readAsDataURL is completed
        this.url = e.target["result"];
      };
    }
  }

}
