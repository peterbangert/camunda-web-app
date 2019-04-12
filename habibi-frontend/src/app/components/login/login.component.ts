import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

  styleUrls: ['../../_css/deployment-view.scss',]

})
export class LoginComponent implements OnInit {

  constructor() { }

  @Output() login = new EventEmitter<boolean>();

  ngOnInit() {
  }

  clickLogin() {
    this.login.emit(true);
  }


}
