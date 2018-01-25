import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../shared/services/login.service';
import { PasswordValidation } from './passwordValidator';
import { UserRegistration } from '../shared/services/UserRegistration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  protected form: FormGroup;
  public userPhoto: string;
  protected formErrors = {
    isEmpty: 'Поле обов\'язкове для заповнення',
    invalidName: 'Ім\'я повенна мати більше 5-ти символів',
    invalidEmail: 'Неправильна електронна пошта',
    invalidPassword: 'Пароль повинен місти тільки цифри та букви (6 символів)',
    invalidRePassword: 'Паролі не збігаються'
  };
  protected placeholders = {
    name: 'Як вас називати?',
    email: 'Яка адреса вашої пошти?',
    password: 'Який буде проль?',
    rePassword: 'Повторіть пароль'
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.form = this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(5)]],
      'email': ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
      'passwords': this.fb.group({
        'password': ['', [Validators.required, Validators.pattern(/^(?![0-9]{6,18})[0-9a-zA-Z]{6,18}$/)]],
        'rePassword': ['', Validators.required]
      }, {
        validator: PasswordValidation.matchPassword
      })
    });
  }

  uploadPhoto(photo: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.userPhoto = reader.result;
    };
    reader.readAsDataURL(photo[0]);
  }

  register(newUserData) {
    newUserData.password = newUserData.passwords.password;
    newUserData.rePassword = newUserData.passwords.rePassword;
    newUserData.photo = this.userPhoto || '';

    this.loginService.registration(newUserData).subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit() {
  }

}
