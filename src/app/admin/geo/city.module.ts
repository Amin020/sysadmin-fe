import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/core/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './city/cities/cities.component';
import { NewCityComponent } from './city/new-city/new-city.component';
import { CitiesHomeComponent } from './city/cities-home/cities-home.component';
import { EditCityComponent } from './city/edit-city/edit-city.component';
const routes: Routes = [
    {
        path: '',
        component: CitiesHomeComponent,
        children: [
            {
                path: '',
                children: [
                    { path: 'new', component: NewCityComponent },
                    { path: 'edit/:id', component: EditCityComponent },
                ]
            }
        ]
    }

];
@NgModule({
    declarations: [
        CitiesComponent,
        NewCityComponent,
        CitiesHomeComponent,
        EditCityComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class CityModule { }
