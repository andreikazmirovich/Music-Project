import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stream-page',
  templateUrl: './stream-page.component.html',
  styleUrls: ['./stream-page.component.scss']
})
export class StreamPageComponent implements OnInit {

  @ViewChild('audio') audio: any;

  peer;

  constructor() { }

  ngOnInit() {
    this.peer = new Peer({key: 'vyx4c4y4p6fajor'});
    this.peer.on('open', () => {
      console.log(this.peer.id);
    });

    this.peer.on('call', call => {
      const audio = this.audio.nativeElement;
      this.getUserMicrofone(true, stream => {
        call.answer(stream);
        call.on('stream', remoteSream => {
          audio.src = URL.createObjectURL(remoteSream);
          audio.play();
        });
      });
    });
  }

  connect(anotherId) {
    const audio = this.audio.nativeElement;
    const conn = this.peer.connect(anotherId);

    this.getUserMicrofone(false, stream => {
      const call = this.peer.call(anotherId, stream);
      call.on('stream', remoteStream => {
        audio.src = URL.createObjectURL(remoteStream);
        audio.play();
      });
    });
  }

  getUserMicrofone(audioRequired, callback) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({audio: audioRequired, video: true}, stream => {
      callback(stream);
    }, () => {
      console.error('Error! Make sure to click allow when asked for permission by the browser');
    });
  }

}
