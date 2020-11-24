import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RolesListComponent } from './roles-list/roles-list.component';
import { CreateEditRoleComponent } from './create-edit-role/create-edit-role.component';
import { RoleManagementComponent } from './role-management.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RoleManagementComponent,
    RolesListComponent,
    CreateEditRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RoleManagementRoutingModule,
    TranslateModule
  ]
})
export class RoleManagementModule { }
