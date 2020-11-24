import { Component, OnInit } from '@angular/core';
import { RegionsService } from 'src/app/services/admin/geo.service';
import { Region } from '../../region';
import { LoaderService } from 'src/app/core/loader.service';

interface reg {
  obj: Region
}
@Component({
  selector: 'app-regions-home',
  templateUrl: './regions-home.component.html',
  styleUrls: ['./regions-home.component.scss']
})


export class RegionsHomeComponent implements OnInit {
  regions: any;
  loading: Boolean = false;
  constructor(private RegionsService: RegionsService,private loaderSerivce: LoaderService) {

  }

  GetRegionList() {
    this.loading = true;
    this.RegionsService.getRegions().subscribe(data => {
      console.log(data)
      this.regions = data;
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    });

  }

  ngOnInit() {


  }



}
