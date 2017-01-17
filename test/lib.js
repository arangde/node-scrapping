/**
 * Created by balmasi on 2016-09-19.
 */

import { expect, should } from 'chai';
import { fetch, process } from '../refactor/lib';
import mockPowerball from './fixtures/powerball.fixture';

describe('#fetch', async function () {
  it('should return response body from passed in url', async () => {
    const $ = await fetch('http://www.powerball.com/pb_home.asp');
    expect($.html()).include('<html');
  });

  it('should throw an error if url is invalid or site is down', async () => {
    expect(fetch('http://aakjsdlksjdadlkjadljasldaskldjass.com')).to.be.rejected;
  });
});


describe('#process', async function () {
  it('should transform response', async () => {
    expect(await process(mockPowerball)).to.have.property('numbers', '\r\n     \r\n    9\r\n     \r\n    19\r\n     \r\n    51\r\n     \r\n    55\r\n     \r\n    62\r\n     \r\n    14\r\n     \r\n    \r\n    $40 Million\r\n    \r\n    \r\n  !');
  });
});
