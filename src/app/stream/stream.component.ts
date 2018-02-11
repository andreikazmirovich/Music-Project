import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StreamService } from './stream.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  @ViewChild('audio') audio: any;

  peer;
  streamStarted = false;

  constructor(
    private streamService: StreamService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.peer = new Peer({key: 'vyx4c4y4p6fajor'});

    this.peer.on('error', function(error) {
      console.error('Peer error', error);
    });

    this.route.params.subscribe(params => {
      if (params.username !== localStorage.getItem('username')) {
        this.streamService.getStream(params.username).subscribe(response => {
          const stream = response.data;
          const conn = this.peer.connect(stream.stream_key);
          conn.on('open', () => {
            conn.send(this.peer.id);
          });
        });
      } else {
        this.peer.on('open', () => {
          this.streamService.createStream({stream_key: this.peer.id}).subscribe(response => {
            console.log(`Broadcast creating status: ${response.status}`);
            this.streamStarted = true;
          });
          this.peer.on('connection', conn => {
            conn.on('data', key => {
              this.connect(key);
            });
          });
        });
      }
    });

    this.peer.on('call', call => {
      const audio = this.audio.nativeElement;
      this.getUserMicrofone(false, stream => {
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
    conn.on('open', () => {
      conn.send(this.peer.id);
    });

    this.getUserMicrofone(true, stream => {
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
