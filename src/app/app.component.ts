import { Component, OnInit } from '@angular/core';
import { RecordingService } from './services/recording.service';
import { DataService } from './services/data.service';
import { take, takeUntil } from 'rxjs/operators';
// import {Subscription} from '@reactivex/rxjs/es6/Subscription.js' ;
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[RecordingService,DataService]
})
export class AppComponent implements OnInit {
  title = 'accent';
  private blob:any;
  private audio:any;
  private recordedTime: moment.Duration;
  private blobUrl: string;
  private timeremaining: number;
 private maxTimeAllowed: any;
 private recsubscription:Subscription;
 private datasubscription:Subscription;
  constructor(private recorder:RecordingService,
    private dataservice:DataService
    ) {}

    stop():void{
      this.recorder.stop();
     }

     begin():void{
      this.recorder.begin();
     }
  ngOnInit(){
    // this.blob = this.recorder.getRecordedBlob();
    this.recsubscription= this.recorder.getRecordedTime().subscribe((time: moment.Duration) => {
      this.recordedTime = time;
      this.timeremaining = Math.floor(this.maxTimeAllowed.asSeconds() - this.recordedTime.asSeconds());
      if (this.timeremaining<=0) {
        this.recorder.stopRecording();
      }
      //this.detectChanges();
    });
  
    this.recorder.getRecordedBlob().subscribe((blob) => {
      //console.log(data.blob);
      this.blobUrl = URL.createObjectURL(blob);
      this.audio = this.blobUrl;
      this.blob = blob;
  
  
    this.dataservice.saveAudio(this.blob).pipe(take(1)).subscribe(()=>{
  
          })
  
  
  
    });
  }
  ngOnDestroy(){
    this.recsubscription.unsubscribe();
    this.datasubscription.unsubscribe();

  }
  

}






