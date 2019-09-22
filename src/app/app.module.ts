import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RecordingService } from './services/recording.service';
import { DataService } from './services/data.service';
//import { HttpClient } from 'selenium-webdriver/http';
@NgModule({
  declarations: [
    AppComponent,
    //HttpClient,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  // exports:[
  //   HttpClient,
  // ],
  providers: [RecordingService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
