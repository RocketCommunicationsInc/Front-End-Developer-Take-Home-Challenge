import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize the first letter of a lowercase word', () => {
    expect(pipe.transform('hello')).toBe('Hello');
  });

  it('should capitalize the first letter and keep the rest unchanged', () => {
    expect(pipe.transform('wORLD')).toBe('WORLD');
  });

  it('should return an empty string when input is empty', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return an empty string when input is null', () => {
    expect(pipe.transform(null as any)).toBe('');
  });

  it('should return an empty string when input is undefined', () => {
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should capitalize a single-character word', () => {
    expect(pipe.transform('a')).toBe('A');
  });

  it('should handle whitespace correctly', () => {
    expect(pipe.transform(' hello')).toBe(' hello');
  });
});
