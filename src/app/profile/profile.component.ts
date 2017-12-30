import { Component, AfterViewInit } from '@angular/core';
import * as WaveSurfer from 'wavesurfer.js/dist/wavesurfer.min';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit {

  public songs = [
    {
      name: 'I Love Dogs',
      path: '../../assets/1.mp3'
    },
    {
      name: 'Mashka Gerba\'s Anime',
      path: '../../assets/2.mp3'
    }
  ];
  public curentWave: {id: number, song: any, playNow: boolean} = {id: null, song: null, playNow: false};

  constructor() {}

  closeAllTracksInfo(): void {
    const tracksInfo = document.querySelectorAll('.track-info');
    Array.from(tracksInfo).forEach(element => {
      element.style.height = '0px';
      const btn = element.parentNode.children[0].children[2].children[0];
      if (btn.className === 'fa fa-pause') { btn.className = 'fa fa-play'; }
    });
    if (this.curentWave.song) { this.curentWave.song.destroy(); }
  }

  setPlayClickEvents(): void {
    const playButtons = document.querySelectorAll('.fa-play');
    for (let i = 0; i < playButtons.length; i++) {
      playButtons[i].addEventListener('click', (e: MouseEvent) => {
        let wavesurfer;
        const infoBlock = e.path[3].children[1];
        const curentBtn = infoBlock.parentNode.children[0].children[2].children[0];
        if (i === this.curentWave.id) {
          wavesurfer = this.curentWave.song;
          console.log(this.curentWave.playNow);
          if (this.curentWave.playNow) {
            this.curentWave.playNow = false;
            curentBtn.className = 'fa fa-play';
          } else {
            this.curentWave.playNow = true;
            curentBtn.className = 'fa fa-pause';
          }
          this.curentWave.song.playPause();
        } else {
          this.closeAllTracksInfo();
          wavesurfer = this.setWaveSurfer(i);
          wavesurfer.load(this.songs[i].path);
          curentBtn.className = 'fa fa-pause';
        }
        this.curentWave.id = i;
        this.curentWave.song = wavesurfer;
        this.curentWave.song.on('ready', () => {
          this.curentWave.song.play();
          this.curentWave.playNow = true;
        });
        infoBlock.style.height = '150px';
      });
    }
  }

  setWaveSurfer(id: number): WaveSurfer {
    return WaveSurfer.create({
      container: `#waveform-${id}`,
      waveColor: 'violet',
      progressColor: 'purple',
      barWidth: 1,
    });
  }

  ngAfterViewInit() {
    this.setPlayClickEvents();
  }

}
