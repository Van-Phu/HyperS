import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { required: true };
    }

    const errors: ValidationErrors = {};

    if (!/[a-z]/.test(value)) {
      errors['lowercase'] = true;
    }
    else if (!/[A-Z]/.test(value)) {
      errors['uppercase'] = true;
    }
    else if (!/\d/.test(value)) {
      errors['number'] = true;
    }
    else if (!/[@$!%*?&]/.test(value)) {
      errors['specialChar'] = true;
    }
    else if (value.length < 8) {
      errors['minLength'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}
