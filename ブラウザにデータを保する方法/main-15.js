/*
localStorage
*/
// 同じオリジンのサイトのタブ間でデータを共有できる
// localStorageに保存する
// 指定する値は文字列のデータのみ
localStorage.setItem('name', 'John');

// 値を取得するとき
let result = localStorage.getItem('name');

// 削除するとき
localStorage.removeItem('name');

// localStorageをすべて削除
localStorage.clear();

/*
sessionStorage
*/
// localStorageとの違い：一つのタブだけで存在する（タブを消すと消える）
// localStorageと同じプロパティを持つ
sessionStorage.setItem('name', 'John');

/*
storageイベント - localStorageの変更を検知できる
*/
window.addEventListener('storage', (event) => {
  // console.log('storage event', event);
});

/*
Cookie
localStorageと違い、host毎にデータを保存している
*/
document.cookie = 'name=John';
result = document.cookie;

// データの取得 = 専用メソッドはない
document.cookie.split('; ').forEach((cookie) => {
  let [key, value] = cookie.split('=');
  if (key === 'name') {
    result = value;
  }
});

/*
Cookie - cookieの生存期間
*/
// 保持する期間を指定
document.cookie = 'name=John; max-age=3';

// 消える日時を指定
let date = new Date();
date.setDate(date.getDate() + 1);
document.cookie = `name=John; expires=${date.toUTCString()}`;

// 消す方法 - 過去を指定
document.cookie = 'name=John; max-age=0';
document.cookie = 'name=John; max-age=-3';
document.cookie = `name=John; expires=${new Date(0).toUTCString()}`; // 1970.1.1

// デフォルトの有効期間 - ブラウザを「終了」したら消える
document.cookie = 'name=John'; // 指定しなければデフォルト

/*
Cookie - path属性
hostに加えてpathの制限も加える
*/

result = document.cookie;
// パスが違うと別々のcookieとして保存される
document.cookie = 'user=Minori; path=/';
document.cookie = 'user=Minori; path=/items';

// パスのデフォルト
// ①URLにスラッシュが1つ
document.cookie = 'user=Minori; path=/';

// ②URLにスラッシュが2つ以上 - 一番右側のスラッシュ以降を含まない値
// 例）127.0.0.1:8080/items/1の場合
document.cookie = 'user=Minori; path=/items';

console.log(result);

/*
Cookie - domain属性
サブドメインにもcookieを共有する
*/
document.cookie = 'user=Minori; domain=/';

/*
Cookie - secure属性
安全なスキーム（= https）のときだけ扱えるようにする
*/
document.cookie = 'id=123; secure';

/*
Cookieヘッダー
ユーザー識別子でよく利用される
*/
// リクエストヘッダーにCookieが入る = document.cookieで取得できるgetterの値がそのまま入る

/*
Set-Cookieヘッダー
*/
// サーバーからもCookieをセット・取得が可能
// レスポンスヘッダーにSet-Cookieヘッダーがあった場合、Cookieをそのホストに入れることができる
// httpbin.org/response-headers?Set-Cookie=name=John;

/*
Cookie - httponly属性
*/
// http通信でのみ使用可能 JSでは使用できなくなる
// httpbin.org/response-headers?Set-Cookie=name=John; httponly

/*
CSRF(XSRF) - samesite属性
*/
// Strict - 同じサイトからのリクエストにしかCookieを送らない（UX的には不便になることも）
document.cookie = 'name=John; samesite=Strict';
// Lax - 安全なナビゲーションなら送る（GETリクエストでのリンククリックやブックマークアクセスではCookieが送られる）
document.cookie = 'name=John; samesite=Lax';
// どんなクロスサイトリクエストでもCookieを送る、必ずSecureとセット
document.cookie = 'name=John; samesite=None: Secure';
document.cookie = 'name=John;'; // デフォルトもLax

/*
fetchでCookieを送る方法
*/
// omit - Cookie を一切送らない、レスポンスのSet-Cookieも無視（認証不要のAPIを叩くとき、トラッキング防止）
fetch('url', { credentials: 'omit' });
// 同一オリジンの場合だけCookieを送る
fetch('url', { credentials: 'same-origin' }); // デフォルト
// オリジンが違ってもCookieを送る
// サーバー側も「Access-Control-Allow-Credentials: true」を返さないとブロックされる
fetch('url', { credentials: 'include' }); // デフォルト

/*
encodeURIComponent
*/
document.cookie = 'name=Jo;hn';
// 値をエンコード
result = encodeURIComponent('Jo;hn'); // Jo%3Bh
// 逆変換
result = decodeURIComponent(result); // Jo;hn

// Cookieに安全にセット
document.cookie = `name=${encodeURIComponent('Jo;hn')}`; // name=Jo%3Bhn
document.cookie.split('; ').forEach((cookie) => {
  let [key, value] = cookie.split('=');
  if (key === 'name') {
    result = decodeURIComponent(result);
  }
});

/*
indexedDB - 作成/取得/削除/エラー処理
*/
indexedDB.deleteDatabase('shop');
// openメソッドはDBを使う準備を非同期的に始める - indexedDBはpromiseに対応していない
let openRequest = indexedDB.open('shop');
// upgradeneeded - 新しくDBを作成するときに、successやerrorの直前に発生するイベント
openRequest.addEventListener('upgradeneeded', () => {
  console.log('upgradeneeded');
  let db = openRequest.result;
  let books = db.createObjectStore('books', {
    autoIncrement: true, // キーを自動で採番してくれる
    // keyPath: 'id', // データ内の id プロパティをキーにする
  });
  /*
  DBに保存する方法
  */
  // オブジェクトストア：キーに対して複数のvalueを持つ
  db.createObjectStore('books');
  db.createObjectStore('games');
  // オブジェクトストアを削除
  db.deleteObjectStore('games');
  // オブジェクトストアが存在するかを確認
  db.objectStoreNames.contains('books');
  console.log(db);
  console.log(db);
});
// DBの準備が完了したら呼び出される
openRequest.addEventListener('success', () => {
  console.log('success');
  let db = openRequest.result;
  // db.transaction('books', 'readonly'); // デフォルト
  // データの変更方法
  let transaction = db.transaction('books', 'readwrite');
  let books = transaction.objectStore('books');
  // put - データを追加 - 非同期
  books.put('JavaScript Guide', 0); // keyとValue
  books.put('Python Guide', 1); // keyとValue

  request = books.get(1);

  /*
  キーの範囲を指定する
  引数を指定しなければ、すべてのデータを取得する
  */
  // request = books.getAll(IDBKeyRange.bound(1, 4));
  // request = books.getAll(IDBKeyRange.lowerBound(1, 4));
  // request = books.getAll(IDBKeyRange.upperBound(1, 4));
  // request = books.getAllKeys(IDBKeyRange.upperBound(4, true));
  // request = books.getKey(IDBKeyRange.upperBound(4, true));
  // request = books.count(IDBKeyRange.upperBound(4, true));
  // request = books.count(1);

  // add - 追加しかできない
  let request = books.add('JavaScript Guide', 0);
  request.addEventListener('error', (event) => {
    console.log('error from request');
    console.log(event.target.error, message);
    event.preventDefault();
  });
  transaction.addEventListener('error', () => {
    console.log('error from transaction');
  });

  // get - データを取得 - 非同期
  request = books.get(0); // キーを指定
  request.addEventListener('success', () => {
    result = request.result;
    console.log(result);
  });
  // books.delete(0); // 指定したキーのデータだけ削除
  // books.clear(0); // オブジェクトストア内の全データを削除
  console.log(db);

  // 一連の流れがすべて成功したとき
  transaction.addEventListener('complete', () => {
    console.log('complete');
    books.get(0); // 使えない 新しいtransaction{}を作成すればOK
  });

  // 明示的にtransactionを中止する
  transaction.abort();
  throw ' error';
  // abortやthrowがあったとき
  transaction.addEventListener('abort', () => {
    console.log('abort');
    books.get(0); // 使えない 新しいtransaction{}を作成すればOK
  });
});
// エラー処理
openRequest.addEventListener('error', () => {
  console.log('error');
  let error = openRequest.error;
  console.log(error.message);
});

// DBを削除
// indexedDB.deleteDatabase('shop');
