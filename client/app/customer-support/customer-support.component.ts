import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { CatService } from '../services/cat.service';
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
  file: File;

  returnUrl: string;

  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Bangladesh, CountryISO.Germany];

  constructor(
    private formBuilder: FormBuilder,
    public catService: CatService
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
    if(files.length > 0) this.file = files[0];
  }
  onSubmit(): void {
    console.log(this.form.value.file);
    this.form.get('file').setValue(this.file);
    // this.http.post('/api/upload',this.form.value);
    this.catService.getCats().subscribe(cats => console.log(cats));
  }
}
