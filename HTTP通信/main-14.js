/*
fetch
APIからJSONを取得、フォームを送信、ファイルをアップロードなど
第二引数に「オプションオブジェクト」を渡すことで GET以外のリクエストや細かい設定が可能
*/

// 呼び出した瞬間にリクエストが送られる
fetch('https://jsonplaceholder.typicode.com/posts', {
  // デフォルトはGETリクエスト
  // bodyに値が指定されているときは、GETかHEAD以外を指定
  // HEADはbodyがないバージョン
  method: 'POST',
  headers: {
    Accept: 'text/plain', // レスポンスのbodyとしてどういう種類を受け入れるのか
    'Content-Type': 'text/plain;charset=utf-8', // MIMEタイプ
  },
  // body: 'hello',
  body: new ArrayBuffer(16),
});

/*
JSON
*/
let json = 'null';
json = '"hello"'; // 文字列はダブルクォートで囲う
json = '[null, true, 32, ["hello", -3]]';
json = '{"name": "Tom", "age": 29}';

// JSON形式の文字列 → JavaScriptのオブジェクトに変換
let result = JSON.parse(json);
console.log(result);

// JavaScriptのオブジェクト → JSON形式の文字列に変換
result = JSON.stringify(result);
console.log(result);

/*
Blob
*/
let input = document.querySelector('input');
input.addEventListener('change', () => {
  let file = input.files[0];
  /*
FormData
*/
  let formData = new FormData();
  formData.append('user', 'minori');
  formData.append('password', 'fjfjia');
  formData.append('blob', new Blob(['hello']), 'binary');
  formData.append('profile', file, 'picture.png');

  // 指定したキーが存在するかどうかを true/false で返す
  result = formData.has('profile');
  // 指定したキーに対応する最初の値を返す（Fileや文字列）
  result = formData.get('profile');
  // 指定したキーとその値をすべて削除する
  result = formData.delete('profile');
  // 指定したキーに対応するすべての値を配列で返す
  result = formData.getAll('profile');
  result = formData;
  console.log(formData);

  /*
  <form> 要素から直接 FormData を生成
  */
  let form = document.querySelector('form');
  formData = new FormData(form);

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST', // データをサーバに送信する
    body: formData,
  });
  let objectURL = URL.createObjectURL(file);
  let img = document.querySelector('img');
  img.src = objectURL;
  img.addEventListener('load', () => {
    // Blobをガベージコレクト
    URL.revokeObjectURL(objectURL);
  });
  console.log(objectURL);
});

// Blobを作成
new Blob([new ArrayBuffer(), 'hello', new Blob()], { type: 'application/octet-stream' });
// バイナリ → 文字列に変換
new TextDecoder().decode(new ArrayBuffer(16));
// 文字列 → バイナリに変換
result = new TextEncoder().encode('hello');
