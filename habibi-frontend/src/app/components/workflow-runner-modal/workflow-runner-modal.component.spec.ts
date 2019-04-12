import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowRunnerModalComponent } from './workflow-runner-modal.component';

describe('WorkflowRunnerModalComponent', () => {
  let component: WorkflowRunnerModalComponent;
  let fixture: ComponentFixture<WorkflowRunnerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowRunnerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowRunnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
