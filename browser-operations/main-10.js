/*
WebAPI
*/
alert('hello');

// ok or chancel
let result = confirm('are you sure?'); // okはtrueを返す

// prompt
// 第二引数はデフォルト
result = prompt('name', 'default'); // 入力したものが返る

/*
navigator
ブラウザや端末の情報・機能にアクセスできる Web API の入り口
*/
// 位置情報 : navigator.geolocation
// クリップボード : navigator.clipboard
// 画面サイズ : screen
// ネットワーク情報 : navigator.onLine

// 例: 位置情報（ユーザー許可が必要 httpsのみ）
if ('geolocation' in navigator) {
  // navigator.geolocation.getCurrentPosition(
  //   (pos) => console.log('lat/lng:', pos.coords.latitude, pos.coords.longitude),
  //   (err) => console.error('Geolocation error:', err)
  // );
}

// 例: クリップボード（ユーザー操作イベント内で呼ぶのが基本）
async function copyToClipboardExample() {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText('Hello World!');
    console.log('Copied to clipboard');
  }
}

/*
location
URLの情報が入っている
*/
location.href;
('http://127.0.0.1:5500/%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E6%93%8D%E4%BD%9C/index-10.html');

location.protocol;
('http:');

location.hostname;
('127.0.0.1');

location.origin;
('http://127.0.0.1:5500');

// httpsは443、httpは80
location.port;
('5500');

location.host;
('127.0.0.1:5500');

location.hostname;
('127.0.0.1');

location.pathname;
('/%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E6%93%8D%E4%BD%9C/index-10.html');

location.hash;
('');

location.search;
('');

/*
location
値を代入できる
*/
// 再読み込み
location.reload();

// 履歴を残して遷移
location.assign('/new');

// 履歴を置き換えて遷移（戻る不可）
location.replace();

/*
history
*/
console.log('history.length:', history.length);

// 戻る
history.back;

// 進む
history.forward;

// 指定の分だけ進む、戻る
history.go(3);

// URLだけ変更する リロードはしない
history.pushState({ foo: 1 }, '', '?page=2');

/*
URLオブジェクト
*/
// URLを解析する
let url = new URL('https://developer.mozilla.org/en-US/docs/Web/API');
url.pathname;
url.search;
url.href;
console.log(url);

result = url.searchParams.get('');
result = url.searchParams.set('page', '2');
result = url.searchParams.append('page', '4');
result = url.searchParams.get('page');
result = url.searchParams.getAll('page');
result = url.searchParams.has('page');
result = url.searchParams.sort();
for (const [key, value] of url.searchParams) {
  console.log(key, value);
}

/*
setTimeout
*/
// 1000ミリ秒が保証されているというより、最低1000ミリは待つのようなイメージ
let timerID = setTimeout(() => {
  console.log('hello');
}, 1000); // 1000ミリ秒後に実行
console.log('apple'); // 先にこちらが実行

// 消したいとき
clearTimeout(timerID); // setTimeoutが識別子のような数値を返している

// 繰り返したいとき
timerID = setInterval(() => {
  console.log('hello');
}, 1000); // 1秒ごとに

setTimeout(() => {
  clearInterval(timerID);
}, 3000); // 3秒経ったらクリア

/*
知っておくと便利なAPI
*/
// getSelection();
// IntersectionObserverAPI;
// PaymentRequestAPI;
// WebCryptoAPI;
// FullscreenAPI;
// WebAudioAPI;
// PWA（Progressive Web Apps）
// AerviceWorkersAPI
// PushAPI
// WebNotificationsAPI
// VibrationAPI
// SensorAPI
