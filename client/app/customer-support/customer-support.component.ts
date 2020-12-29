import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ToastComponent } from '../shared/toast/toast.component';
import { validationConfig } from './customer-support.validation';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss']
})
export class CustomerSupportComponent {
  form: FormGroup;
  isFileSelected = false;


  returnUrl: string;

  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Bangladesh, CountryISO.Germany];
  phoneForm = new FormGroup({
    phone: new FormControl('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder,
    public toast: ToastComponent
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
    this.isFileSelected = true;
  }
  onSubmit(): void {
    console.log(this.form);
  }
}
