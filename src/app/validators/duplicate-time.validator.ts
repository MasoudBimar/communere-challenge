
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function duplicateTimeValidator(control: AbstractControl): ValidationErrors | null {

  if (control?.value) {
    const dic: Record<string, boolean> = {};
    const duplicates: string[] = [];
    (control.value as string[]).filter(value => typeof value === 'string').forEach(element => {
      if (element) {
        if (dic[element]) {
          duplicates.push(element);
        } else {
          dic[element] = true;
        }
      }
    });

    if (duplicates.length > 0) {
      return { hasDuplicateTime: true, duplicateTime: duplicates.join(', ') }
    }
  }

  return null;
}
