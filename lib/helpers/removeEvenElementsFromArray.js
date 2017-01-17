export default async function (arr){
  var out = 0;
  for (var i = 0; i < arr.length; i++) {
    if ( (i % 2 )) {
      arr[out++] = arr[i];
    }
  }
  arr.length = out;
  return arr;
}