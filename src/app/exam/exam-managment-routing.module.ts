import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { CreateNewExamComponent } from './pages/create-new-exam/create-new-exam.component';
import { ExamResultContainerComponent } from './pages/exam-result-container/exam-result-container.component';
import { OnGoingExamComponent } from './pages/on-going-exam/on-going-exam.component';

const routes: Routes = [
    {
        path: 'create-exam',
        component: CreateNewExamComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'create-exam/:examId',
        component: CreateNewExamComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':examId',
        component: OnGoingExamComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':examId/result',
        component: ExamResultContainerComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamManagementRoutingModule { }
