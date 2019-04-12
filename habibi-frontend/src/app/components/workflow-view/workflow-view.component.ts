import {Component, OnInit} from '@angular/core';
import {RunWorkflowService} from '../../_services';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import * as translationDE from '../../../assets/l18n/locale-de.json';
import * as translationEN from '../../../assets/l18n/locale-en.json';
import * as workflowTemplate from '../../../assets/json/workflow.json';
import * as workflowStatus from '../../../assets/json/workflowStatus.json';
import {AppConfig} from '../../app.config';


@Component({
  selector: 'app-workflow-view',
  templateUrl: './workflow-view.component.html',
  styleUrls: [
    '../../_css/workflow-view.scss']
})
export class WorkflowViewComponent implements OnInit {

  displayedColumns = [];
  deployments: Array<any>;
  openTasks: Array<any>;
  initialized = false;
  websocketUrl = AppConfig.settings.urls.websocket;
  private stompClient;
  runningWorkflow = false;
  startBlock = true;
  workflow = workflowTemplate;

  constructor(private runWorkflowService: RunWorkflowService) {
  }

  ngOnInit() {

    const self = this;

    this.runWorkflowService.getAllDeployments().subscribe(data => {
      for (let columnName in data[0]) {
        this.displayedColumns.push(columnName);
      }
      this.deployments = data;
    });
    this.runWorkflowService.getOpenTasks().subscribe(data => {
      this.openTasks = data;
    });

  }

  showMore(id) {

    let element_tr = document.getElementById(id);
    let _container = document.getElementById(id + '_more_less');

    if (_container.innerText === translationEN.components.workflowView.less
      || _container.innerText === translationDE.components.workflowView.less) {
      _container.innerText = 'components.workflowView.more';
      this.toggleCollapsible(false, element_tr);
    } else {
      _container.innerText = 'components.workflowView.less';
      this.toggleCollapsible(true, element_tr);
    }
  }


  toggleCollapsible(flag: boolean, table: HTMLElement) {

    for (let child in table.childNodes) {
      if ((<HTMLElement>table.childNodes[child]).classList == null) {
        continue;
      } else if ((<HTMLElement>table.childNodes[child]).classList.contains('collapsible')) {

        if (flag) {
          (<HTMLElement>table.childNodes[child]).style.display = 'inline-grid';
        } else {
          (<HTMLElement>table.childNodes[child]).style.display = 'none';
        }
      }
    }
  }

  stageWorkflow(element, new_task, _container) {

    if (!this.initialized) {
      this.initializeWebSocketConnection();
      this.initialized = true;
    }
    this.workflow.status = null;

    if (new_task) {
      this.workflow = workflowTemplate;

    } else {
      this.workflow.task_id = element.id;
    }
    for (let x in element) {
      if (element[x] != null) {
        this.workflow[x] = element[x];
      }
    }
    this.runningWorkflow = true;
    this.startBlock = new_task;
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.websocketUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe(AppConfig.settings.urls.extensions.chat, (message) => {
        if (message.body) {

          that.workflow = JSON.parse(message.body);
        }
      });
    });
  }

  sendMessage(workflow) {
    if (this.workflow.status == null) {
      this.workflow.status = workflowStatus.starting;
    }
    this.workflow = {...this.workflow, ...workflow};

    //this.workflow.fields = null;
    for (let i = 0; i < this.workflow.fields.length; i++) {
      const inputElement: HTMLInputElement = document.getElementById(this.workflow.fields[i].key) as HTMLInputElement;
      this.workflow.fields[i].value = inputElement.value;
    }

    console.log(this.workflow);
    this.stompClient.send(AppConfig.settings.urls.extensions.sendMessage, {}, JSON.stringify(this.workflow));
  }

  unstageWorkflow() {
    this.runningWorkflow = false;
    this.runWorkflowService.getOpenTasks().subscribe(data => {
      this.openTasks = data;
    });
  }
}
