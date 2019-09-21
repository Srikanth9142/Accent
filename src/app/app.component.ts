import { Component, OnInit } from '@angular/core';
import { RecordingService } from './services/recording.service';
import { DataService } from './services/data.service';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[RecordingService,DataService]
})
export class AppComponent implements OnInit {
  title = 'accent';
  private blob:any;
  constructor(private recorder:RecordingService,
    private dataservice:DataService
    ) {}
  ngOnInit(){
    // this.blob = this.recorder.getRecordedBlob();
    this.recorder.getRecordedTime().pipe(takeUntil(this.unsubscribe)).subscribe((time: moment.Duration) => {
      this.recordedTime = time;
      this.timeremaining = Math.floor(this.maxTimeAllowed.asSeconds() - this.recordedTime.asSeconds());
      if (this.timeremaining<=0) {
        this.toggleRecording();
      }
      this.detectChanges();
    });
  
    this.recorder.getRecordedBlob().pipe(takeUntil(this.unsubscribe)).subscribe((blob) => {
      //console.log(data.blob);
      this.blobUrl = URL.createObjectURL(blob);
      this.audio.src = this.blobUrl;
      this.blob = blob;
  
  
    this.dataservice.saveAudio(this.blob).pipe(take(1)).subscribe(()=>{
  
          })
  
  
  
    });
  }


}






