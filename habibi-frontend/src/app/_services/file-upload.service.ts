import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AppConfig} from '../app.config';




/** Handles HttpClient errors */
@Injectable()
export class FileUploadService {

  httpOptions;
  baseURL = AppConfig.settings.urls.camunda;
  deploymentURL = AppConfig.settings.urls.extensions.deployment;

  constructor(
    private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders( JSON.stringify(AppConfig.settings.camundaHttpHeaders))};

  }


  postFile(deployment: String): Observable<{}> {

    const url = `${this.baseURL}/${this.deploymentURL}`;

    return this.http.post(url, deployment, this.httpOptions);
  }

}
