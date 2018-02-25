import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title } from '@angular/platform-browser';

import { UserService } from './user.service';
import { User } from './User';
import { AudioService } from '../shared/services/audio.service';
import { LoginService } from '../shared/services/login.service';
import { SubscribedListModalComponent } from './subscribed-list-modal/subscribed-list-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user;
  public audios;
  public isLoggedIn: boolean;
  public isCurentLoggedInUser: boolean;
  public isSubscribed: boolean;
  public isSocialInfoOpened = false;
  public subscriptionsCount: number;
  public subscribersCount: number;
  public curentAudio: {id: number, song: any, playNow: boolean} = {id: null, song: null, playNow: false};

  constructor(
    private userService: UserService,
    private audioService: AudioService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  closeAllTracksInfo(): void {
    const tracksInfo = document.querySelectorAll('.track-info') as HTMLCollectionOf<HTMLElement>;
    Array.from(tracksInfo).forEach(element => {
      element.style.height = '0px';
      element.style.padding = '0px';
      const btn = element.parentNode.children[0].children[2].children[0];
      if (btn.className === 'fa fa-pause') { btn.className = 'fa fa-play'; }
    });
    const audios = document.querySelectorAll('audio') as HTMLCollectionOf<HTMLAudioElement>;
    Array.from(audios).forEach(element => {
      element.pause();
      element.style.display = 'none';
      element.currentTime = 0;
    });
  }

  setPlayClickEvents(): void {
    const playButtons = document.getElementsByClassName('fa-play');
    for (let i = 0; i < playButtons.length; i++) {
      playButtons[i].addEventListener('click', (e: MouseEvent) => {
        const infoBlock = e.path[3].children[1];
        const audioBlock: HTMLMediaElement = infoBlock.children[0];
        const curentBtn = infoBlock.parentNode.children[0].children[2].children[0];
        this.curentAudio.song = audioBlock;
        if (i === this.curentAudio.id) {
          if (this.curentAudio.playNow) {
            this.curentAudio.playNow = false;
            curentBtn.className = 'fa fa-play';
            audioBlock.pause();
          } else {
            this.curentAudio.playNow = true;
            curentBtn.className = 'fa fa-pause';
            audioBlock.play();
          }
        } else {
          this.curentAudio.id = i;
          this.curentAudio.playNow = true;
          this.closeAllTracksInfo();
          audioBlock.style.display = 'block';
          audioBlock.play();
          curentBtn.className = 'fa fa-pause';
        }
        infoBlock.style.height = '52px';
        infoBlock.style.padding = '10px 0';
      });
    }
  }

  checkIsLoggedIn(callback): void {
    this.loginService.isLoggedIn().subscribe(response => {
      callback(response.data);
    });
  }

  subscribeOrDescribe(): void {
    this.userService.subscribeOrDescribe(this.user.username).subscribe(response => {
      if (response[0] === 'subscribed') {
        this.isSubscribed = true;
        this.subscribersCount++;
      } else {
        this.isSubscribed = false;
        this.subscribersCount--;
      }
    });
  }

  openSubscribedListModal() {
    const dialogRef = this.dialog.open(SubscribedListModalComponent, {
      width: '300px',
      data: {
        curentUsername: this.user.username
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUserByUsername({username: params.username}).subscribe(response => {
        this.user = response.user;
        this.userService.getSubscriptionsAndSubscribersCount(this.user.username).subscribe(resp => {
          this.isSocialInfoOpened = false;
          this.subscriptionsCount = resp[0].data;
          this.subscribersCount = resp[1].data || 0;
        });
        this.audioService.getUserAudios(this.user.id).subscribe(audioResp => {
          this.audios = audioResp.audios;
          setTimeout(() => {
            this.setPlayClickEvents();
          }, 1);
        });
      });
      this.checkIsLoggedIn(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        if (this.isLoggedIn) {
          this.loginService.getUser().subscribe(response => {
            this.isCurentLoggedInUser = response.user.username === params.username;
            if (!this.isCurentLoggedInUser) {
              this.userService.isSubscribed(params.username).subscribe(resp => {
                this.isSubscribed = resp.data;
              });
            }
          });
        }
      });
    });
  }

}
