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
