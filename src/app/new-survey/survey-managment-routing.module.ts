import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { CreateNewSurveyComponent } from './pages/create-new-survey/create-new-survey.component';
import { GroupMangementComponent } from './pages/group-mangement/group-mangement.component';

const routes: Routes = [
    {
        path: 'create-survey',
        component: CreateNewSurveyComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'group-prefrences',
        component: GroupMangementComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SurveyManagementRoutingModule { }
