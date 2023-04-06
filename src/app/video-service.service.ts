import { Injectable } from '@angular/core';
import { from, fromEvent, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {

  private videoObservable: Observable<MediaStream> |undefined ;// = from(navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'environment' } }));
 // onVideoDataAvailable: Subject<any> = new Subject<any>();
  onStreamCreated: Subject<any> = new Subject<any>();
  onRecordingStopped: Subject<any> = new Subject<any>();
  recorder: MediaRecorder | null = null;
  private stream:any | undefined;
  private   recordedChunks:BlobPart[] = [];

  constructor() {

  }

  dataCaptured = (event: any)=> {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
         // this.onVideoDataAvailable.next(event.data);
        }
  }

  dataStopped = (event:any)=> {
    
    let url = URL.createObjectURL(new Blob(this.recordedChunks));
    this.onRecordingStopped.next(url);
  }
  // Method to Start Video Recording
  startVideoRecording() {
    this.recordedChunks = [];
    this.videoObservable = from(navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'environment' } }));
    this.videoObservable.subscribe((x) => {
      // Sending Created Strem Value
      this.stream = x;
      this.onStreamCreated.next(x);

      this.recorder = new MediaRecorder(this.stream);
      this.recorder.ondataavailable = this.dataCaptured;
      this.recorder.onstop = this.dataStopped;

      this.recorder.start(1000);

    });


  }

  stopVideoRecording() {
    if (this.recorder != null) {
      this.recorder.stop();
     // this.stream.getTracks().forEach((x: { stop: () => any; }) => x.stop());
      this.recorder = null;
  
    }
  }
}
