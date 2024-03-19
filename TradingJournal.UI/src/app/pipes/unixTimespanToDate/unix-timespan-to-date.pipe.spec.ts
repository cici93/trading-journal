import { UnixTimespanToDatePipe } from './unix-timespan-to-date.pipe';

describe('UnixTimespanToDatePipe', () => {
  it('create an instance', () => {
    const pipe = new UnixTimespanToDatePipe();
    expect(pipe).toBeTruthy();
  });
});
