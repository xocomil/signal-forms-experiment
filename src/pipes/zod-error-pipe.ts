import { Pipe, PipeTransform } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';

@Pipe({
  name: 'zodError',
})
export class ZodErrorPipe implements PipeTransform {
  transform(value: ValidationError): string | undefined {
    return isZodValidationError(value) ? value.issue.message : value.message;
  }
}

type ZodValidationError = { issue: { message: string } };

function isZodValidationError(error: unknown): error is ZodValidationError {
  return (
    typeof error === 'object' &&
    error != null &&
    'issue' in error &&
    typeof error.issue === 'object' &&
    error.issue != null &&
    'message' in error.issue
  );
}
