import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UserService } from '../user.service';

@Component({
  selector: 'app-subscribed-list-modal',
  templateUrl: './subscribed-list-modal.component.html',
  styleUrls: ['./subscribed-list-modal.component.scss']
})
export class SubscribedListModalComponent {
  username = this.data.curentUsername;
  subscriptions: [{username: string, photo: string}];

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<SubscribedListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getAllSubscriptions();
  }

  getAllSubscriptions(): void {
    this.userService.getAllSubscriptions(this.username).subscribe(response => {
      this.subscriptions = response.data;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
