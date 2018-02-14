import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../shared/services/login.service';
import { PasswordValidation } from './passwordValidator';
import { UserRegistration } from '../shared/services/UserRegistration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  protected form: FormGroup;
  public userPhoto: string;
  protected formErrors = {
    isEmpty: 'Поле обов\'язкове для заповнення',
    invalidName: 'Ім\'я повенна мати більше 5-ти символів',
    invalidUsername: 'Неправильне ім\'я користувача',
    invalidEmail: 'Неправильна електронна пошта',
    invalidMusicStyle: 'Кількість символів не повинна перевищувати 40',
    invalidDescription: 'Кількість символів не повинна перевищувати 500',
    invalidPassword: 'Пароль повинен місти тільки цифри та букви (6 символів)',
    invalidRePassword: 'Паролі не збігаються'
  };
  protected placeholders = {
    name: 'Яке ваше ім\'я?',
    username: 'Як вас називати?',
    email: 'Яка адреса вашої пошти?',
    description: 'Опишіть себе',
    musicStyle: 'Який стиль музики?',
    password: 'Який буде проль?',
    rePassword: 'Повторіть пароль'
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.form = this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(5)]],
      'username': ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]{3,16}$/)]],
      'description': ['', Validators.maxLength(500)],
      'musicStyle': ['', Validators.maxLength(40)],
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
    console.log(newUserData);
    this.loginService.registration(newUserData).subscribe(response => {
      console.log(response);
      if (response.message === 'User created Successfully!') {
        this.loginService.login({
          email: newUserData.email,
          password: newUserData.password
        }).subscribe(resp => {
          localStorage.setItem('name', newUserData.name);
          localStorage.setItem('username', newUserData.username);
          localStorage.setItem('photo', newUserData.photo);

          location.assign(`./${localStorage.getItem('username')}`);
        });
      }
    });
  }

}
