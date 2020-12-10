import { FormatGRMTimePipe } from '@grmCommon/pipes/format-time.pipe'

/**
 * The format GRM time pipe tests
 */
describe('FormatGRMTimePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatGRMTimePipe()
    expect(pipe).toBeTruthy()
  })
})
