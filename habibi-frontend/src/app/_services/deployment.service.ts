import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from '../app.config';


@Injectable()
export class DeploymentService {

  httpOptions;
  baseURL = AppConfig.settings.urls.backend;
  deploymentURL = AppConfig.settings.urls.extensions.deployment;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders( JSON.stringify(AppConfig.settings.camundaHttpHeaders))};
  }

  getAll(): Observable<any> {
    const url = `${this.baseURL}${this.deploymentURL}`;
    return this.http.get(url);
  }

  removeDeployment(id: number): Observable<{}> {
    const url = `${this.baseURL}${this.deploymentURL}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
