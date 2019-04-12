import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app.config';


@Injectable()
export class DownloaderService {
  baseURL = AppConfig.settings.urls.backend;
  deploymentURL = AppConfig.settings.urls.extensions.deployment;

  constructor(
    private http: HttpClient) {
  }

  getDeployment(id: number) {
    const url = `${this.baseURL}/${this.deploymentURL}/${id}`;

    return this.http.get(url);

  }

  private log(filename: string, data: string) {
    const message = `DownloaderService downloaded "${filename}" and got "${data}".`;

  }

  private logError(filename: string, error: any) {
    const message = `DownloaderService failed to download "${filename}"; got error "${error.message}".`;
    console.error(message);

  }
}

