/*
非同期
*/

// コールバック関数での非同期処理 - setTimeoutの例
setTimeout(() => {
  console.log('two');
  window.addEventListener('click', () => {
    console.log('wait');
  });
}, 3000);
alert('not async');
console.log('one');

// 非同期のAPIは2つのパートに分けられる - ①メインのC++、②その後にJavaScript
navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
});
console.log(1);

/*
コールバック地獄 - コードが見にくい、エラー処理が動かない
*/
window.addEventListener('click', (e) => {
  console.log(e);
  setTimeout(() => {
    console.log('setTimeout');
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setInterval(() => {
        console.log('setInterval');
      }, 1000);
    });
  }, 1000);
});

/*
try catch - 失敗時のエラー処理が分散しやすく、捕まえにくい
*/
try {
  setTimeout(() => {
    throw new Error('error'); // setTimeoutで処理が飛ばされ捕捉できない
  }, 1000); // 0の場合でも、後続の処理が優先される

  // C++エラーが起きたら対処が難しい場合がある
} catch (error) {
  console.log(error);
}
