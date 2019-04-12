import {Component, OnInit} from '@angular/core';
import {DownloaderService, FileUploadService, DeploymentService} from '../../_services';
import {FileUploader} from 'ng2-file-upload';

import * as translationDE from '../../../assets/l18n/locale-de.json';
import * as translationEN from '../../../assets/l18n/locale-en.json';
import {AppConfig} from '../../app.config';


@Component({
  selector: 'app-deployment-view',
  templateUrl: './deployment-view.component.html',
  styleUrls: ['../../_css/deployment-view.scss',]
})

export class DeploymentViewComponent implements OnInit {

  displayedColumns = [];
  deployments: Array<any>;
  fileToUpload: File = null;

  constructor(private deploymentService: DeploymentService,
              private downloaderService: DownloaderService,
              private fileUploadService: FileUploadService) {
    var self = this;
  }

  baseUrl = AppConfig.settings.urls.camunda;
  deploymentUrl = AppConfig.settings.urls.extensions.deployment;
  post_url = `${this.baseUrl}${this.deploymentUrl}`;
  uploader: FileUploader = new FileUploader({url: this.post_url, removeAfterUpload: true, autoUpload: true});

  ngOnInit() {
    this.deploymentService.getAll().subscribe(data => {

      for (let j in data[0]) {
        this.displayedColumns.push(j);
      }
      this.deployments = data;
    });
  }

  notImplemented(div) {
    console.log(div);
  }

  removeDeployment(id) {
    console.log(id);
    this.deploymentService.removeDeployment(id).subscribe();
  }

  download(id) {
    this.downloaderService.getDeployment(id)
      .subscribe(data => {
        var filename = id + '.json';
        var json = JSON.stringify(data);
        var blob = new Blob([json], {type: 'application/json'});
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      });
  }

  handleFileInput(files: FileList) {
    console.log('here');
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    console.log('uploading');
    let reader = new FileReader();
    let self = this;
    reader.onload = function () {
      let text = reader.result;
      console.log(reader.result);
      self.fileUploadService.postFile(reader.result.toString()).subscribe(data => {

      }, error => {
        console.log(error);
      });
    };
    reader.readAsText(this.fileToUpload);
  }

  showMore(id) {

    let element_tr = document.getElementById(id);
    let _container = document.getElementById(id + '_more_less');

    if (_container.innerText === translationEN.components.deploymentView.less
      || _container.innerText === translationDE.components.deploymentView.less) {
      _container.innerText = 'components.deploymentView.more';
      this.toggleCollapsible(false, element_tr);
    } else {
      _container.innerText = 'components.deploymentView.less';
      this.toggleCollapsible(true, element_tr);
    }
  }

  toggleCollapsible(flag: boolean, table: HTMLElement) {

    for (let child in table.childNodes) {
      if ((<HTMLElement>table.childNodes[child]).classList == null) {
        continue;
      } else if ((<HTMLElement>table.childNodes[child]).classList.contains('collapsible')) {

        if (flag) {
          (<HTMLElement>table.childNodes[child]).style.display = 'table-cell';
        } else {
          (<HTMLElement>table.childNodes[child]).style.display = 'none';
        }
      }
    }
  }


}
