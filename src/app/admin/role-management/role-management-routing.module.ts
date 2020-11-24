import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleManagementComponent } from './role-management.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { CreateEditRoleComponent } from './create-edit-role/create-edit-role.component';

const routes: Routes = [
  {
    path: '',
    component: RoleManagementComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'edit/:id/copy',
        component: CreateEditRoleComponent
      },
      {
        path: 'edit/:id',
        component: CreateEditRoleComponent
      },
      {
        path: 'create-role',
        component: CreateEditRoleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule { }
