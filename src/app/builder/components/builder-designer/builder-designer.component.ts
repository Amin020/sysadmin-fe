import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-builder-designer',
  templateUrl: './builder-designer.component.html',
  styleUrls: ['./builder-designer.component.scss']
})
export class BuilderDesignerComponent implements OnInit {

  id: any;
  constructor(route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
    console.log(this.id);
   }

  ngOnInit() {
  }


}
