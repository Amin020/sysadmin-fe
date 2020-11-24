import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeaturesService } from 'src/app/services/admin/features.service';
import { LoaderService } from 'src/app/core/loader.service';
import { ParentListBase } from 'src/app/core/parent-list-base';

@Component({
  selector: 'app-features-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends ParentListBase implements OnInit {

  features: any;
  loading = true;
  message: number;

  constructor(
    private featureService: FeaturesService,
    private router: Router, private loaderSerivce: LoaderService
  ) {
    super();
  }

  ngOnInit() {
    this.getFeaturesList();
    this.featureService.currentMessage.subscribe(
      message => (this.message = message)
    );
    this.featureService.refreshFeaturesList.subscribe(refresh =>
      this.getFeaturesList()
    );
  }

  private getFeaturesList() {
    this.loading = true;
    this.featureService.getFeatures().subscribe(data => {
      this.features = data;
      // check for # of paginators
      this.updatePagination(this.features);
      this.featureService.changeMessage(Number(this.features[this.features.length - 1].id) + 1);
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    }, error => {
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  edit(feature) {
    this.router.navigate(['/features/edit/' + feature.id]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  delete(feature) {
    this.featureService.deleteFeature(feature.id).subscribe(() => {
      this.getFeaturesList();
    });
  }
}
