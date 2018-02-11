import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  form: FormGroup;
  formPlaceholders = {
    email: 'Електронна пошта',
    password: 'Пароль'
  };
  buttonPlaceholders = {
    logIn: 'Увійти',
    signUp: 'Реєстрація'
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createLoginForm();
  }

  createLoginForm() {
    this.form = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  login(data) {
    this.dialogRef.close();
    this.loginService.login(data).subscribe(response => {
      this.loginService.getUser().subscribe(userResp => {
        const user = userResp.user;
        console.log(user);

        localStorage.setItem('name', user.name);
        localStorage.setItem('username', user.username);
        localStorage.setItem('photo', user.photo);

        location.reload();
      });
    });
  }

}
