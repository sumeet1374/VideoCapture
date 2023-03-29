import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VideoServiceService } from '../video-service.service';

@Component({
  selector: 'app-videocapture',
  templateUrl: './videocapture.component.html',
  styleUrls: ['./videocapture.component.css']
})
export class VideocaptureComponent implements OnInit,OnDestroy,AfterViewInit {
  @ViewChild("videorecording")
  videoRecording: ElementRef | undefined;

  @ViewChild("videorecorded")
  videoPlay: ElementRef | undefined;

  isRecording: Boolean = false;
  recordedChunks:any[] = [];

  constructor(private videoService: VideoServiceService) {

  }
  ngAfterViewInit(): void {
    console.log("View init done");
  }
  ngOnDestroy(): void {
    this.videoService.onStreamCreated.unsubscribe();
    this.videoService.onVideoDataAvailable.unsubscribe();
    this.videoService.onRecordingStopped.unsubscribe();
  }
  ngOnInit(): void {
    this.videoService.onStreamCreated.subscribe(this.onSteamCreated);
    this.videoService.onVideoDataAvailable.subscribe(this.onVideoDataAvailable);
    this.videoService.onRecordingStopped.subscribe(this.onRecordingStopped);
  }

  onSteamCreated = (value:any)=>{
    let compRef = this.videoRecording?.nativeElement;
    console.log(compRef);
    compRef.srcObject = value;
  }

  onVideoDataAvailable = (event:any)=>{
    if (event.size > 0) {
      this.recordedChunks.push(event);
      console.log(this.recordedChunks);

    }
  }

  onRecordingStopped= (data:any)=>{
    let recordedRef = this.videoPlay?.nativeElement;
    this.isRecording = false;
    console.log(this.isRecording);
    recordedRef.src = URL.createObjectURL(new Blob(this.recordedChunks, { type: data }));
  }


   recordVideo() {
    if(this.isRecording === false) {
      this.isRecording = true;
      this.recordedChunks = [];
      this.videoService.startVideoRecording();
    }
  

  }

  stopRecoding(){
    if(this.isRecording === true) {
      this.isRecording = false;
      this.videoService.stopVideoRecording();
    }

  }

}
