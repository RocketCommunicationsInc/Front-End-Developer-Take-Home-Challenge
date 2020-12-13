import { ContactFilterPipe } from '@grmContacts/pipes/contact-filter.pipe'

describe('ContactFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ContactFilterPipe()
    expect(pipe).toBeTruthy()
  })
})
