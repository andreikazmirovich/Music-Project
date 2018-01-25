import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: LoginService
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
    this.auth.login(data).subscribe(response => {
      console.log(response);
      this.auth.getUser().subscribe(data => {
        console.log(data);
      });
    });
  }

  ngOnInit() {
  }

}
