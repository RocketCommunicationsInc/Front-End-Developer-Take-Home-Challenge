import { ContactsCountPipe } from './contacts-count.pipe';

describe('ContactsCountPipe', () => {
  it('create an instance', () => {
    const pipe = new ContactsCountPipe();
    expect(pipe).toBeTruthy();
  });
});
