import { Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

export const validationConfig = {
  email: ['', [Validators.required, Validators.email]],
  name: ['', [Validators.required, Validators.minLength(3)]],
  companyName: ['', [Validators.required, Validators.minLength(3)]],
  phone: [''],
  file: [null, [Validators.required, RxwebValidators.fileSize({maxSize: 10485760})]]
};
