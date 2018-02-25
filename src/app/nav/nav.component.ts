import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AddAudioDialogComponent } from './add-audio-dialog/add-audio-dialog.component';
import { StreamDialogComponent } from './stream-dialog/stream-dialog.component';
import { User } from '../profile/User';
import { UserService } from '../profile/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLoggedIn = false;
  isSearchInputVisible = false;
  isMenuVisible = false;
  userPhoto = '';
  username = '';
  localSearchUsername: string;
  findedUsers: User[] = [];

  constructor(
    public dialog: MatDialog,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px'
    });
  }

  openAddAudioDialog(): void {
    const dialogRef = this.dialog.open(AddAudioDialogComponent, {
      width: '300px'
    });
  }

  openStreamDialog(): void {
    const dialogRef = this.dialog.open(StreamDialogComponent, {
      width: '250px'
    });
  }

  onClickOnSearchButton(): void{
    this.isSearchInputVisible = !this.isSearchInputVisible;
    document.querySelector('input[_ngcontent-c2]').focus();
  }

  searchUser(username): void {
    if (username !== this.localSearchUsername) {
      if (username) {
        this.userService.searchUserByUsername(username).subscribe(response => {
          if(this.findedUsers !== response.data) {
            this.findedUsers = response.data;
          }
        });
        this.localSearchUsername = username;
      }
      else{
        this.findedUsers = [];
      }
    }
  }

  ngOnInit() {
    this.loginService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn.data) {
        this.loginService.getUser().subscribe(response => {
          this.userPhoto = localStorage.getItem('photo');
          this.username = localStorage.getItem('username');
        }, error => {
          if (error.statusText === 'Unauthorized') {
            localStorage.clear();
          }
        });
      }
    });
  }

}
