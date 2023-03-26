import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { VideocaptureComponent } from './videocapture/videocapture.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import {MatSidenavModule} from '@angular/material/sidenav';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SideNavMenuComponent,
    VideocaptureComponent,
    ThumbnailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
