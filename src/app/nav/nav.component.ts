import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLoggedIn = false;
  userPhoto = localStorage.getItem('userPhoto');

  constructor(public dialog: MatDialog) { }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px'
    });
  }

  ngOnInit() {
  }

}
