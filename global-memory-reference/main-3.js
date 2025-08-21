/*
グローバルオブジェクト
ジャバスクリプトエンジンが一覧でglobalオブジェクトを定義している
*/
// 一覧を呼び出す
// console.log(globalThis);

/*
var
*/
// 同じ変数名を再宣言できる
var hello = 'hello';
var hello = 'hi';
console.log(hello);
// オブジェクト以外の{}内にアクセスできる
{
  var tomato = 'tomato';
}
console.log(tomato);

// ホイスティング = 関数宣言のように巻き上げられる
// 厳密には変数のみ巻き上げられる
// 例）var apple;のみ

/*
use strict
*/
// use strictをしていると関数宣言はブロックスコープになる
// 関数内でだけuse strictを適応することもできる
{
  function sayTomato() {
    'use strict';
    var tomato = 'tomato';
  }
}

/*
「primitive」 number,stringなど...
*/
// 変数はメモリにx=8として保存されている
let x = 8;

/*
「object = reference」 object、配列、関数
*/
// objectの場合はメモリのxにオブジェクトを丸ごとではなく、オブジェクトがある番地を渡す

const coffee = {
  name: 'Caffe Latte',
};
const coffee2 = coffee; // coffeeのオブジェクト全部ではなく、オブジェクトの番地を入れている
coffee2.name = 'Espresso';
console.log(coffee); // coffeeも影響を受けてしまう

const coffee3 = {
  name: 'Caffe Latte',
};
console.log(coffee === coffee3); // falseになる

// constでオブジェクトを作っていれば値が変わることは全然ある！！！（ミュータブル=可変）

/*
ガベージコレクション
// JavaScriptエンジンにある メモリ管理 アクセスできないオブジェクトを削除してくれる
*/
