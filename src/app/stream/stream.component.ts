import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { StreamService } from './stream.service';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  @ViewChild('audio') audio: any;

  peer;
  isAdmin;
  username = localStorage.getItem('username');
  streamStarted = false;
  connections = [];
  // members = [];
  members = [
    'Pucka44',
    'Sraka',
    'Piska Semecvetik',
    'Chlenosos',
    'Gamno19'
  ];

  buttonPlaceholders = {
    end: 'Завершити'
  };

  constructor(
    private streamService: StreamService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.peer = new Peer({key: 'vyx4c4y4p6fajor'});

    this.peer.on('error', function(error) {
      console.error('Peer error', error);
    });

    this.route.params.subscribe(params => {
      this.checkAdmin(params.username);
      if (params.username !== localStorage.getItem('username')) {
        this.streamService.getStream(params.username).subscribe(response => {
          if (response.data.message !== 'Not Found') {
            const stream = response.data;
            const conn = this.peer.connect(stream.stream_key);
            conn.on('open', () => {
              this.streamService.addNewMember(params.username, this.username).subscribe(() => {
                conn.send(this.peer.id);
                this.streamStarted = true;
              });
            });
          }
        });
      } else {
        this.peer.on('open', () => {
          this.streamService.createStream({stream_key: this.peer.id}).subscribe(response => {
            this.streamStarted = true;
          });
          this.peer.on('connection', conn => {
            conn.on('data', key => {
              this.connect(key);
              this.streamService.getLastMember(this.username).subscribe(response => {
                this.members.push(response.lastMember);
                this.notifyAboutNewUser(response.lastMember);
              });
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
    /*conn.on('open', () => {
      conn.send(this.peer.id);
    });*/

    this.getUserMicrofone(true, stream => {
      const call = this.peer.call(anotherId, stream);
      this.connections.push(call);
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

  closeAllConnections(): void {
    this.streamService.deleteStream(this.username).subscribe(response => {
      while (this.connections[0]) {
        this.connections.forEach(conn => {
          conn.send('broadcast finished');
          conn.close();
          this.connections.splice(this.connections[this.connections.indexOf(conn)], 1);
        });
      }
    });
  }

  checkAdmin(username): void {
    this.loginService.getUser().subscribe(response => {
      this.isAdmin = response.user.username === username ? true : false;
    });
  }

  notifyAboutNewUser(message: string): void {
    this.snackBar.open(message, null, {
      duration: 2000,
      extraClasses: ['notifySnackBar']
    });
  }

}
