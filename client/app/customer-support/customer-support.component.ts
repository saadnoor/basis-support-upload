import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { CatService } from '../services/cat.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { validationConfig } from './customer-support.validation';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss']
})
export class CustomerSupportComponent {
  form: FormGroup;
  isFileSelected = false;
  file: File;

  returnUrl: string;

  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Bangladesh, CountryISO.Germany];
  siteKey = environment.recapchaSiteKey;

  constructor(
    private formBuilder: FormBuilder,
    public catService: CatService,
    public http: HttpClient
  ){
    this.buildForm();
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
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('email', this.form.get('email').value);
    formData.append('name', this.form.get('name').value);
    formData.append('companyName', this.form.get('companyName').value);
    this.http.post('/api/file', formData).subscribe( res => console.log(res));
  }
}
