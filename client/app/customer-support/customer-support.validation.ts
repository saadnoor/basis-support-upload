import { Validators } from '@angular/forms';

export const validationConfig = {
  email: ['', [Validators.required, Validators.email]],
  name: ['', [Validators.required, Validators.minLength(3)]],
  companyName: ['', [Validators.required, Validators.minLength(3)]],
  phone: ['']
};
