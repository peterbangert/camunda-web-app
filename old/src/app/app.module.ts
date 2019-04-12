import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { CommentsComponent } from './comments/comments.component';
import { SimilarVideosComponent } from './similar-videos/similar-videos.component';
import { VideoInfoComponent } from './video-info/video-info.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { VideoBrowserComponent } from './video-browser/video-browser.component';
import { BrowserComponent } from './browser/browser.component';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    CommentsComponent,
    SimilarVideosComponent,
    VideoInfoComponent,
    HomeComponent,
    NavBarComponent,
    SideBarComponent,
    VideoBrowserComponent,
    BrowserComponent,
    VideoplayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
