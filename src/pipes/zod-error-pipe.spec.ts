import { ZodErrorPipe } from './zod-error-pipe';

describe('ZodErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new ZodErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
