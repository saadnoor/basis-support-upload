import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { validationConfig } from './customer-support.validation';
import { environment } from '../../environments/environment';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ReCaptcha2Component } from 'ngx-captcha';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CustomerSupportService } from '../services/customer-support.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss']
})
export class CustomerSupportComponent {
  form: FormGroup;
  file: File;
  isLoading = false;
  captchaLang: string;

  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Bangladesh, CountryISO.Germany];
  siteKey = environment.recapchaSiteKey;

  @ViewChild('takeInput', {static: false})
  InputVar: ElementRef;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;

  options: AnimationOptions = {
    path: '/assets/loading.json',
  };

  constructor(
    private formBuilder: FormBuilder,
    public http: HttpClient,
    private auth: AuthService,
    private userService: UserService,
    public translateService: TranslateService,
    public customerSupportService: CustomerSupportService,
    private toastr: ToastrService
  ){
    this.buildForm();
    this.captchaLang = this.translateService.currentLang;
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.form.controls;
  }

  buildForm(): void {
    this.form = this.formBuilder.group(validationConfig);

    this.formInitializer();
  }

  formInitializer(): void {
    this.form.get('email').setValue(this.auth.currentUser.email);
    this.form.get('name').setValue(this.auth.currentUser.username);
    this.form.get('companyName').setValue(this.auth.currentUser.companyName);
  }

  onFileChange(files: File[]): void {
    if (files.length > 0) {
      this.file = files[0];
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('email', this.form.get('email').value);
    formData.append('name', this.form.get('name').value);
    formData.append('companyName', this.form.get('companyName').value);
    this.customerSupportService.uploadFile(formData)
    .subscribe(
    () => {
      this.handleSuccessfulUpload();
    },
    () => {
      this.handleUploadError();
    }
  );
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  onLanguageChange(language): void {
    this.translateService.use(language);
    this.captchaLang = language;
  }

  handleSuccessfulUpload(): void {
    this.translateService.get('successfulSubmit')
    .subscribe( val => {
      this.toastr.success(val );
    });

    this.isLoading = false;
    this.form.reset();
    this.InputVar.nativeElement.value = '';
    this.captchaElem.resetCaptcha();
    this.formInitializer();
  }

  handleUploadError(): void {
    this.isLoading = false;
    this.translateService.get('errorSubmit')
    .subscribe( val => {
      this.toastr.warning(val);
     });
  }
}
