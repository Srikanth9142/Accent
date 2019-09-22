import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as moment from 'moment';
declare var Recorder: any;

@Injectable({
  providedIn: 'root'
})
export class RecordingService {
  private startTime;
  private interval;
  private voice_recorder;
  private recording: boolean;
  private gumstream: any;
  private _recorded = new Subject<Blob>();
  private _recordingTime = new Subject<moment.Duration>();
  private _error = new Subject<string>();


  private cancelled = false;

  constructor() {
    this.init();
  }
  private init() {}

  begin(){

    let constraints = { audio: true, video: false }
    console.log("begin");
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      this.start();
      console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

      /*
          create an audio context after getUserMedia is called
          sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
          the sampleRate defaults to the one set in your OS for your playback device
      */
      let audioContext = new AudioContext();

      this.gumstream = stream;

      /* use the stream */
      let input = audioContext.createMediaStreamSource(stream);

      /* 
          Create the Recorder object and configure to record mono sound (1 channel)
          Recording 2 channels  will double the file size
      */
      this.voice_recorder = new Recorder(input, { numChannels: 2 })

    });
    //catch
    
    
    // (function (err) {
    //     console.log("denied");
    // });


    this.recording = false;
  }



  getRecordedBlob(): Observable<Blob> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<moment.Duration> {
    return this._recordingTime.asObservable();
  }

  getError(): Observable<string> {
    return this._error.asObservable();
  }

  startTimer() {
    this._recordingTime.next(moment.duration(0));
    this.startTime = moment();
    this.interval = setInterval(
      () => {
        const currentTime = moment();
        const diffTime = moment.duration(currentTime.diff(this.startTime));
        if (!this.cancelled)
          this._recordingTime.next(diffTime);
      },
      1000
    );
  }


  startRecording() {
    console.log("start");
    if (this.recording) {
      console.log("already recording");
      return;
    }
    this.recording = true;

    this.voice_recorder.record();
  }

  stopRecording(save:boolean = true) {
    
    if (this.recording) {
      console.log("stop");
      this.recording = false;
      //tell the recorder to stop the recording
      this.voice_recorder.stop();

      //stop microphone access
      this.gumstream.getAudioTracks()[0].stop();

      if(save)
      //create the wav blob and pass it on to createDownloadLink
      this.voice_recorder.exportWAV((blob:Blob) => {
        this._recorded.next(blob);
      });
    }
  }

  stopTimer() {
    clearInterval(this.interval);
    this.startTime = null;
  }

  start() {
    this.cancelled = false;
    this.startRecording();
    this.startTimer();
  }

  stop(save:boolean=true) {
    this.stopRecording(save);
    this.stopTimer();
  }

  cancel() {
    this.cancelled = true;
    this.stop(false);
  }

}





