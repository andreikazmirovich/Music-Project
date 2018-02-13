import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AddAudioDialogComponent } from './add-audio-dialog/add-audio-dialog.component';
import { StreamDialogComponent } from './stream-dialog/stream-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLoggedIn = false;
  userPhoto = '';
  username = '';

  constructor(
    public dialog: MatDialog,
    private loginService: LoginService
  ) {}

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px'
    });
  }

  openAddAudioDialog() {
    const dialogRef = this.dialog.open(AddAudioDialogComponent, {
      width: '300px'
    });
  }

  openStreamDialog() {
    const dialogRef = this.dialog.open(StreamDialogComponent, {
      width: '250px'
    });
  }

  ngOnInit() {
    this.loginService.getUser().subscribe(response => {
      this.userPhoto = localStorage.getItem('photo');
      this.username = localStorage.getItem('username');
    }, error => {
      if (error.statusText === 'Unauthorized') {
        localStorage.clear();
      }
    });
  }

}
