import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

@Component({
  selector: 'app-videocapture',
  templateUrl: './videocapture.component.html',
  styleUrls: ['./videocapture.component.css']
})
export class VideocaptureComponent  {
  @ViewChild("videorecording")
  videoRecording:ElementRef | undefined;

  @ViewChild("videorecorded")
  videoPlay:ElementRef | undefined;

  isRecording:Boolean = false;

   constructor(private zone:NgZone){
    const supports = navigator.mediaDevices.getSupportedConstraints();
    console.log(supports);
   }

    async recordVideo(){
      this.isRecording = true;
    const recordedChunks:any[] = [];
    
      let compRef = this.videoRecording?.nativeElement;
      const stream =  await navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'environment' } });//this.canvas?.nativeElement.captureStream(25);
      compRef.srcObject = stream;
      //const options = { mimeType: "video/webm; codecs=vp9" };
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = ()=> {
      let recordedRef = this.videoPlay?.nativeElement;
      this.isRecording = false;
      console.log(this.isRecording);
      recordedRef.src = URL.createObjectURL(new Blob(recordedChunks, { type: mediaRecorder.mimeType }));
    } ;  
    mediaRecorder.start(1000);
    function handleDataAvailable(event:any) {
      console.log("data-available");
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
         console.log(recordedChunks);
       
        //sdownload();
      } else {
        // …
      }
    }
    
    
    // demo: to download after 9sec
    setTimeout(() => {
      console.log("stopping");
      mediaRecorder.stop();
      stream.getTracks().forEach(track => track.stop());
    }, 9000);
    ;
   }
}
