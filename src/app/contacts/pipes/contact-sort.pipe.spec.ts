import { ContactSortPipe } from '@grmContacts/pipes/contact-sort.pipe'

describe('ContactSortPipe', () => {
  it('create an instance', () => {
    const pipe = new ContactSortPipe()
    expect(pipe).toBeTruthy()
  })
})
