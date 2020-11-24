import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ExamService } from '../../exam.service';

@Component({
  selector: 'app-exam-menu',
  templateUrl: './exam-menu.component.html',
  styleUrls: ['./exam-menu.component.scss']
})
export class ExamMenuComponent implements OnInit {

  isCollapsed = false;
  activeUrlType = '/exam/create-exam';
  constructor(
    private examService: ExamService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.examService.toggelSideMenuObservable.subscribe(res => {
      this.isCollapsed = !this.isCollapsed;
    });
    this.activeUrlType = this.location.path();
  }

  navigate(url) {
    this.router.navigateByUrl(url);
    this.activeUrlType = url;
  }

  logout() {
    this.authService.logout();
    this.navigate('login');
  }

}
