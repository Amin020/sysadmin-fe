import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BundleHomeComponent } from './bundle-home/bundle-home.component';
import { BundleListComponent } from './bundle-list/bundle-list.component';
// import { NewBundleComponent } from './new-bundle/new-bundle.component';
import { CreateEditBundleComponent } from './create-edit-bundle/create-edit-bundle.component';
import { AppBundleRoutingModule } from './app-bundle-routing.module';
// import { ToastModule } from 'ng-uikit-pro-standard';
// import { ViewBundleComponent } from './view-bundle/view-bundle.component';
import { SharedModule } from 'src/app/core/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BundleHomeComponent, BundleListComponent
    , CreateEditBundleComponent
  ],
  imports: [
    CommonModule,
    AppBundleRoutingModule,
    FormsModule,
    SharedModule,
    TranslateModule
    // ToastModule.forRoot()
  ]
})
export class AppBundleModule { }
