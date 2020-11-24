import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/loader.service';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-group-mangement',
  templateUrl: './group-mangement.component.html',
  styleUrls: ['./group-mangement.component.scss']
})
export class GroupMangementComponent implements OnInit {


  groups = new Array<Group>();
  submitted: boolean;
  private UserId: string;
  private userData: any;
  private updateForm = false;

  constructor(
    private toaster: ToastrService,
    private loaderSerivce: LoaderService,
    private preferencesService: PreferencesService
  ) { }

  ngOnInit() {
    this.updateForm = false;
    this.submitted = false;
    this.userData = { user: JSON.parse(localStorage.getItem('userData')) };
    this.findUserPreferences();
  }

  addNewGroup() {
    this.groups.push(new Group());
  }

  addNewUser(group: Group) {
    group.invitedUsers.push(new GroupUser());
  }

  deleteUser(group: Group, index: number) {
    group.invitedUsers.splice(index, 1);
  }

  deleteGroup(index) {
    this.groups.splice(index, 1);
  }

  setUserGroups() {
    this.userData["userGroups"].forEach(group => {
      this.groups.push({
        name: group.name,
        invitedUsers: this.setinvitedUsers(group)
      });
    });
  }

  setinvitedUsers(group) {
    const groupUsers = [];
    group.invitedUsers.forEach(y => {
      groupUsers.push({
        email: y.email,
        firstName: y.firstName,
        lastName: y.lastName,
        midName: y.midName,
        password: y.password,
      });
    });
    return groupUsers;
  }

  findUserPreferences() {
    this.submitted = true;
    this.preferencesService.findUserPreferencesByUser(this.userData["user"].id).subscribe(data => {
      if (data) {
        this.UserId = data["id"];
        this.userData = data;
        this.setUserGroups();
        document.getElementById('formSubmittion').innerHTML = "Update";
        this.updateForm = true;
      } else {
        this.UserId = null;
      }
      this.loaderSerivce.isLoading.next(false);
    }, error => {
      console.log("Error occured");
    });
  }

  SendUserPreferences() {
    this.submitted = true;
    const request = {
      createdBy: 'test',
      editBy: 'test',
      logo: this.userData.logo ? this.userData.logo : '',
      logoPosition: this.userData.logoPosition ? this.userData.logoPosition : '',
      mailInvitationTemplate: this.userData.mailInvitationTemplate ? this.userData.mailInvitationTemplate : '',
      mailSurveyCompletion: this.userData.mailSurveyCompletion ? this.userData.mailSurveyCompletion : '',
      user: {
        id: this.userData.user.id
      },
      userGroups: this.groups
    };
    this.preferencesService.sendUserPreferences(request).subscribe(data => {
      if (data) {
        localStorage.setItem('id', data["id"]);
        this.UserId = data["id"];
        this.toaster.success("Congratulation Form Submitted Sucessfully ");
        // this.findUserPreferences();
      }
    }, err => {
      this.toaster.error("Error occured");
    });
  }

  isValid() {
    return true;
  }

  updateUserData() {
    if (this.isValid()) {
      this.submitted = true;
      const request = {
        createdBy: 'test',
        editBy: 'test',
        logo: this.userData.logo,
        logoPosition: this.userData.logoPosition,
        mailInvitationTemplate: this.userData.mailInvitationTemplate,
        mailSurveyCompletion: this.userData.mailSurveyCompletion,
        user: {
          id: this.userData.user.id
        },
        userGroups: this.groups
      };
      this.preferencesService.updateXUserPreferences(request, this.userData.user.id).subscribe(data => {
        this.toaster.success("Congratulation Form Updated Sucessfully ");
        // this.findUserPreferences();
      }, err => {
        this.toaster.error("Error occured");
      });
    } else {
      this.submitted = false;
    }

  }

  sendUserData() {
    if (!this.updateForm) {
      this.SendUserPreferences();
    } else {
      this.updateUserData();
    }
  }

}

export class Group {
  name: string;
  invitedUsers: Array<GroupUser>;

  constructor() {
    this.invitedUsers = [new GroupUser()];
  }
}

export class GroupUser {
  email = '';
  firstName = '';
  lastName = '';
  midName = '';
  password = '';

  constructor() {

  }
}
