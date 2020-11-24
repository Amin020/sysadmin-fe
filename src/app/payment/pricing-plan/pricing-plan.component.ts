import { Component, OnInit } from '@angular/core';
import { PricingPlanService } from './pricing-plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.scss'],
  providers: [PricingPlanService]
})
export class PricingPlanComponent implements OnInit {
  id; offerList = [];
  offerDetails = [];
  constructor(private _pricingServ: PricingPlanService, private router: Router,private loaderSerivce: LoaderService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getPlan();
  }
  navigateTo(id, calcPrice) {
    this.router.navigateByUrl('/company-profile/' + id + `/${calcPrice}`);
  }
  getPlan() {
    this._pricingServ.getPricingPlan(this.id).subscribe((res: any) => {
      this.offerList = res;
      let $this = this;
      this.loaderSerivce.isLoading.next(false);
      this.offerList.forEach((element, index) => {
        if (index == 0) {
          element.offerDetails.forEach(feature => {
            $this.offerDetails.push({ desc: feature.bundleDetailId.sysAppFeature.sysFeature.desc, id: feature.bundleDetailId.sysAppFeature.id, keyFeature: feature.keyFeature })
          });
          return false;
        }
        let exist = false; let offerIndex = 0;
        for (let i = 0; i < element.offerDetails.length; i++) {
          index = i;
          var offer = element.offerDetails[i];
          if ($this.offerDetails[i]['id'] == offer.bundleDetailId.sysAppFeature.id) {
            exist = true;
          }
        }
        if (!exist) {
          let isExist = false;
          $this.offerDetails.forEach(element => {
            if (element.id == offer.bundleDetailId.sysAppFeature.id) {
              isExist = true;
            }
          })
          if (!isExist) {
            $this.offerDetails.push({ desc: offer.bundleDetailId.sysAppFeature.sysFeature.desc, id: offer.bundleDetailId.sysAppFeature.id, keyFeature: offer.keyFeature });
          }
        }
      })
    })
  }
}
