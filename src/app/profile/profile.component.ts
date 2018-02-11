import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from './user.service';
import { User } from './User';
import { AudioService } from '../shared/services/audio.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit, OnInit {

  public user;
  public audios;
  public curentAudio: {id: number, song: any, playNow: boolean} = {id: null, song: null, playNow: false};

  constructor(
    private userService: UserService,
    private audioService: AudioService,
    private route: ActivatedRoute
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUserByUsername({username: params.username}).subscribe(response => {
        this.user = response.user;
        this.audioService.getUserAudios(this.user.id).subscribe(audioResp => {
          this.audios = audioResp.audios;
          setTimeout(() => {
            this.setPlayClickEvents();
          }, 1);
        });
      });
    });
  }

  ngAfterViewInit() {
  }

}
