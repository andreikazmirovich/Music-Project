import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { StreamPageComponent } from './stream-page/stream-page.component';

const routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'stream/:username',
    component: StreamPageComponent
  },
  {
    path: ':username',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
