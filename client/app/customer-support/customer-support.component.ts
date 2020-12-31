import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { CatService } from '../services/cat.service';
import { validationConfig } from './customer-support.validation';
import { environment } from '../../environments/environment';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ReCaptcha2Component } from 'ngx-captcha';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss']
})
export class CustomerSupportComponent {
  form: FormGroup;
  isFileSelected = false;
  file: File;
  isLoading = false;
  returnUrl: string;
  capchaLang: string;

  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
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
    public catService: CatService,
    public http: HttpClient,
    public translateService: TranslateService,
    private toastr: ToastrService
  ){
    this.buildForm();
    this.capchaLang = this.translateService.currentLang;
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.form.controls;
  }

  buildForm(): void {
    this.form = this.formBuilder.group(validationConfig);
  }

  changePreferredCountries(): void {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
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
    this.http.post('/api/file', formData).subscribe( 

    () => {
      this.translateService.get('successfulSubmit')
      .subscribe( val => {
        this.toastr.success(val );
      });
    
      this.isLoading = false;
      this.form.reset();
      this.InputVar.nativeElement.value = ""; 
      this.captchaElem.resetCaptcha();
    },

    () => {
      this.isLoading = false;
      this.translateService.get('errorSubmit')
      .subscribe( val => {
        this.toastr.warning(val);
       });
    }
  );
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  onLanguageChange(language) :void{
    this.translateService.use(language);
    this.capchaLang = language;
  }
}
