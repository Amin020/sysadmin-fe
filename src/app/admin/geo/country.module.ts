import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CountriesComponent } from './country/countries/countries.component';
import { EditCountryComponent } from './country/edit-country/edit-country.component';
import { NewCountryComponent } from './country/new-country/new-country.component';
import { CountriesHomeComponent } from './country/countries-home/countries-home.component';
import { SharedModule } from 'src/app/core/shared.module';
import { ViewCountryComponent } from './country/view-country/view-country.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: CountriesHomeComponent,
        children: [
          { path: '', component: CountriesComponent },
          { path: 'new', component: CountriesComponent },
          { path: 'edit/:id', component: CountriesComponent },
        ]
      },
    
  ];
@NgModule({
  declarations: [
    CountriesComponent,
    ViewCountryComponent,
    EditCountryComponent,
    NewCountryComponent,
    CountriesHomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CountryModule { }
