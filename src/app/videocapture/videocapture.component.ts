import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

@Component({
  selector: 'app-videocapture',
  templateUrl: './videocapture.component.html',
  styleUrls: ['./videocapture.component.css']
})
export class VideocaptureComponent  {
  @ViewChild("videorecord")
  canvas:ElementRef | undefined;

   constructor(private zone:NgZone){

   }

    recordVideo(){
    const recordedChunks:any[] = [];
    this.zone.runOutsideAngular(async ()=> {
      let compRef = this.canvas?.nativeElement;
      const stream =  await navigator.mediaDevices.getUserMedia({ audio: true, video: true });//this.canvas?.nativeElement.captureStream(25);
      //const options = { mimeType: "video/webm; codecs=vp9" };
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    function handleDataAvailable(event:any) {
      console.log("data-available");
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
        console.log(recordedChunks);
        compRef.src = URL.createObjectURL(new Blob(recordedChunks, { type: mediaRecorder.mimeType }));
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
    });
   }
}
