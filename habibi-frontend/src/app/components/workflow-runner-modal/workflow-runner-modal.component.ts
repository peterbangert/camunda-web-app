import {
  Component,
  EventEmitter,
  Input,
  Output, OnChanges, SimpleChanges
} from '@angular/core';

import * as workflowStatus from '../../../assets/json/workflowStatus.json';


@Component({
  selector: 'app-workflow-runner-modal',
  templateUrl: './workflow-runner-modal.component.html',
  styleUrls: []
})
export class WorkflowRunnerModalComponent implements OnChanges {

  @Input() workflow: any;
  @Input() startBlock: any;

  fieldsExist;
  statusExist = false;
  notFinished = true;

  @Output() sendMessage = new EventEmitter<string>();

  emitMessage() {
    this.sendMessage.emit(this.workflow);
  }

  ngOnChanges(changes: SimpleChanges) {

    for (const propName in changes) {

      if (propName === 'startBlock') {
        if (this.startBlock === true) {
          this.setStartingState(changes);
        }
      }
      if (propName === 'workflow') {
        this.setWorkflow(changes['workflow'].currentValue);
        this.statusExist = (changes['workflow'].currentValue.status != null);
        this.workflow.status = (changes['workflow'].currentValue.status == null) ?
          null : this.workflow.status;
        this.notFinished = this.workflow.status !== workflowStatus.finished;
      }

    }


    this.fieldsExist = !(this.workflow.fields == null);
    console.log(this.fieldsExist);
  }

  setWorkflow(workflow) {

    this.workflow = {...this.workflow, ...workflow};
  }

  setStartingState(changes) {

    const startObject = [
      {'Start Process' : {
          'key': 'businessKey',
          'value': ''
        }}
    ];

    this.createWorkflowFormAndFields(startObject);
    console.log('here');

    this.startBlock = changes['startBlock'].currentValue;
    this.notFinished = true;
    this.workflow.status = null;
  }

  createWorkflowFormAndFields(object) {
    if (this.workflow.fields == null) {
      this.workflow.fields = [];
    }
    for (const x in object) {
      for (const y in object[x]) {
        console.log(y);
        console.log(x);
        console.log(object[x][y]);

        this.workflow.fields.push(object[x][y]);
      }
    }
  }

}

