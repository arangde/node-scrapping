import { fetch } from '../index';

export async function getData({ url, path, transform }) {

  const $ = await fetch(url);
  const value = await transform($(path));
  return value
}
