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
