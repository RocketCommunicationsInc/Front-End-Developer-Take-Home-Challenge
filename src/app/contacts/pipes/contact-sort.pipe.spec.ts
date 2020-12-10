import { ContactSortPipe } from '@grmContacts/pipes/contact-sort.pipe'

/**
 * The contacts sort pipe tests
 */
describe('ContactSortPipe', () => {
  it('create an instance', () => {
    const pipe = new ContactSortPipe()
    expect(pipe).toBeTruthy()
  })
})
