import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {MatTableModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpErrorInterceptor,
  DownloaderService,
  FileUploadService,
  DeploymentService,
  RunWorkflowService,
  WebsocketService
} from './_services';
import {PrettyPrintPipe} from './_pipes';
import {DeploymentViewComponent} from './components/deployment-view';
import {AppRoutingModule} from './app-routing.module';
import {FileUploadModule} from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';

import {
  L10nConfig,
  L10nLoader,
  LocalizationModule,
  StorageStrategy,
  ProviderType
} from 'angular-l10n';
import {WorkflowViewComponent} from './components/workflow-view';
import {WorkflowRunnerModalComponent} from './components/workflow-runner-modal';
import {HomeViewComponent} from './components/home-view';
import {AppConfig} from './app.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';


const l10nConfig: L10nConfig = {
  locale: {
    languages: [
      {code: 'en', dir: 'ltr'},
      {code: 'de', dir: 'ltr'}
    ],
    language: 'en',
    storage: StorageStrategy.Cookie
  },
  translation: {
    providers: [
      {type: ProviderType.Static, prefix: '../assets/l18n/locale-'}
    ],
    caching: true,
    composedKeySeparator: '.',
    missingValue: 'No key'
  }
};

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}


@NgModule({
  declarations: [
    AppComponent,
    DeploymentViewComponent,
    WorkflowViewComponent,
    PrettyPrintPipe,
    WorkflowRunnerModalComponent,
    HomeViewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    AppRoutingModule,
    HttpClientModule,
    LocalizationModule.forRoot(l10nConfig),
    ToastrModule.forRoot(),
    FileUploadModule,
    BrowserAnimationsModule,

  ],
  entryComponents: [WorkflowViewComponent,
    DeploymentViewComponent,
    WorkflowRunnerModalComponent

  ],
  providers: [
    DeploymentService,
    DownloaderService,
    FileUploadService,
    RunWorkflowService,
    WebsocketService,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent,
  ]
})

export class AppModule {

  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}


