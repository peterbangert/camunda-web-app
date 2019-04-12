import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AppConfig} from '../app.config';




@Injectable()
export class RunWorkflowService {

  httpOptions;
  baseUrl = AppConfig.settings.urls.backend;
  deploymentUrl = AppConfig.settings.urls.extensions.deployment;
  openTasksUrl = AppConfig.settings.urls.extensions.openTasks;

  constructor(private http: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders( JSON.stringify(AppConfig.settings.camundaHttpHeaders))};
  }

  getOpenTasks(): Observable<any> {
    const url = `${this.baseUrl}${this.openTasksUrl}`;
    return this.http.get(url);
  }

  getAllDeployments(): Observable<any> {
    const url = `${this.baseUrl}${this.deploymentUrl}`;
    return this.http.get(url);
  }

  getDeployment(id): Observable<any> {
    const url = `${this.baseUrl}${this.deploymentUrl}/` + id;
    return this.http.get(url);
  }


}
