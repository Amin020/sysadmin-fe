import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent implements OnInit {
  status;
  msg;
  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((res: any) => {
      if (res.params.status == 'success') {
        this.status = true;
        this.msg = 'Congratulations ,Your Account had been created successfully'
      } else {
        this.status = false;
        this.msg = 'ERROR: Payment was not done successfully, Card holder need to contact his/her bank.';
      }
    });
  }

  ngOnInit(): void {

  }

}
