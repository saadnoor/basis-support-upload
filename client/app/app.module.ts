// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
// Services
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
// Components
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';
import { LottieModule } from 'ngx-lottie';
import player, { LottiePlayer } from 'lottie-web';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomerSupportService } from './services/customer-support.service';
import { FileListComponent } from './file-list/file-list.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
export function playerFactory(): LottiePlayer {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    CustomerSupportComponent,
    FileListComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (): string => localStorage.getItem('token'),
        // allowedDomains: ['localhost:3000', 'localhost:4200']
      }
    }),
    FormsModule,
    NgxCaptchaModule,
    NgxIntlTelInputModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    BsDropdownModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    RxReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CustomerSupportService,
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
