import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { BuilderHomePageComponent } from './components/builder-home-page/builder-home-page.component';
// import { BuilderViewerComponent } from './components/builder-viewer/builder-viewer.component';
// import { BuilderDesignerComponent } from './components/builder-designer/builder-designer.component';

const routes: Routes = [
// {
//   path: '',
//   component: BuilderHomePageComponent,
// },
// {
//   path: 'view/:id',
//   component: BuilderViewerComponent
// }, {
//   path: 'design/:id',
//   component: BuilderDesignerComponent
// },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuilderRoutingModule { }
