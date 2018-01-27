import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AudioService } from '../../shared/services/audio.service';

@Component({
  selector: 'app-add-audio-dialog',
  templateUrl: './add-audio-dialog.component.html',
  styleUrls: ['./add-audio-dialog.component.scss']
})
export class AddAudioDialogComponent implements OnInit {
  form: FormGroup;
  newAudio = {};
  placeholders = {
    audioName: 'Назва'
  };

  constructor(
    private fb: FormBuilder,
    private audioService: AudioService
  ) {
    this.createAddAudioForm();
  }

  createAddAudioForm() {
    this.form = this.fb.group({
      'name': ['', Validators.required, Validators.maxLength(25)]
    });
  }

  uploadAudio(audio: File) {
      console.log(audio);
      const formData = new FormData();
      formData.append('file', audio);
      this.audioService.sendAudio(formData).subscribe(response => {
        console.log(response);
      });
  }

  sendNewAudio(name: string) {

  }

  ngOnInit() {
  }

}
