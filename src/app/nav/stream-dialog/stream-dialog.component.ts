import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-stream-dialog',
  templateUrl: './stream-dialog.component.html',
  styleUrls: ['./stream-dialog.component.scss']
})
export class StreamDialogComponent {
  username = localStorage.getItem('username');
  formPlaceholders = {
    title: 'Назва'
  };
  buttonPlaceholders = {
    start: 'Запустити'
  };

  constructor(
    private dialogRef: MatDialogRef<StreamDialogComponent>,
  ) {}

}
