import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { AudioService } from '../../shared/services/audio.service';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-add-audio-dialog',
  templateUrl: './add-audio-dialog.component.html',
  styleUrls: ['./add-audio-dialog.component.scss']
})
export class AddAudioDialogComponent {
  form: FormGroup;
  base64file: string;
  placeholders = {
    audioName: 'Назва'
  };
  formErrors = {
    isEmpty: 'Поле обов\'язкове для заповнення',
    invalidLength: 'Перевищена допустима кількість символів'
  };

  constructor(
    private fb: FormBuilder,
    private audioService: AudioService,
    private loginService: LoginService,
    private dialogRef: MatDialogRef<AddAudioDialogComponent>
  ) {
    this.createAddAudioForm();
  }

  createAddAudioForm() {
    this.form = this.fb.group({
      'name': ['', [Validators.required, Validators.maxLength(25)]]
    });
  }

  uploadAudio(audio: File) {
      const reader = new FileReader();
      reader.readAsDataURL(audio);
      reader.onload = () => {
        this.base64file = reader.result;
      };
  }

  sendNewAudio(formData: {name: string}) {
    this.loginService.getUser().subscribe(userData => {
      const requestData = {
        user_id: userData.user.id,
        name: formData.name,
        base64file: this.base64file
      };
      this.audioService.sendAudio(requestData).subscribe(response => {
        this.dialogRef.close();
      });
    });
  }

}
