import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: [
    '../../_css/workflow-view.scss']
})
export class HomeViewComponent implements OnInit {

  logged_in = false;

  constructor() { }

  ngOnInit() {
  }

  change_login(login_status: boolean) {
    this.logged_in = login_status;
  }



}
