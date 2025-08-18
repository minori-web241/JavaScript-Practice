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
