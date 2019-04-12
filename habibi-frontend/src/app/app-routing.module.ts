import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {WorkflowViewComponent} from './components/workflow-view';
import {DeploymentViewComponent} from './components/deployment-view';
import {HomeViewComponent} from './components/home-view';

const routes: Routes = [
  {path: '', redirectTo: 'home-view', pathMatch: 'full'},
  {path: 'home-view', component: HomeViewComponent},
  {path: 'deployment-view', component: DeploymentViewComponent},
  {path: 'workflow-view', component: WorkflowViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
