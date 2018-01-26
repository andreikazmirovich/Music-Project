import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './routing.module';
import { LoginDialogComponent } from './nav/login-dialog/login-dialog.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './shared/services/login.service';
import { RegistrationComponent } from './registration/registration.component';
import { TokenInterceptor } from './shared/services/token.interceptor';
import { UserService } from './profile/user.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProfileComponent,
    LoginDialogComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    LoginDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
