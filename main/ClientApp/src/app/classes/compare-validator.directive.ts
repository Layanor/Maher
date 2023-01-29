import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Directive, Input } from '@angular/core';

export function compareValidator(controlNameToCompare: string): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value === null || c.value.length < 8) {
      return null;
    }
    const controlToCompare = c.root.get(controlNameToCompare);

    // console.log(controlToCompare);

    if (controlToCompare) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(
        () => {
          c.updateValueAndValidity();

          if (subscription) {
            subscription.unsubscribe();
          }
       
        }
      );
    }
    return controlToCompare && controlToCompare.value !== c.value
      ? { compare: true }
      : null;
  };
}
@Directive({
  selector: '[compare]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CompareValidatorDirective,
      multi: true,
    },
  ],
})
export class CompareValidatorDirective implements Validator {
  @Input('compare')
  controlNameToCompare: string;

  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value === null || c.value.length < 8) {
      return null;
    }
    const controlToCompare = c.root.get(this.controlNameToCompare);

    console.log(controlToCompare);

    if (controlToCompare) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(
        () => {
          c.updateValueAndValidity();
          if (subscription) {
            subscription.unsubscribe();
          }
        }
      );
    }
    return controlToCompare && controlToCompare.value !== c.value
      ? { compare: true }
      : null;
    //    if (controlToCompare && controlToCompare.value == c.value)return { "equal": true };
    // return { "notEqual": true }
  }
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error("Method not implemented.");
  // }
}
