/*
import文
moduleではデフォルトでstrictモードになる
自分自身や祖先のimportは無視
最初のimport以外は無視
import先のファイルが全て終了していないと実行してはいけない
*/

import { A } from './A.js';
console.log(A);

const hello = 'hello';

// グローバルオブジェクトに登録されない
var banana = 'banana';
console.log(globalThis); // ない

// エラーになる
function add() {}
function add() {}

// トップレベルawait
await 1;

/*
import - 選択的にimport
*/
// exportから呼び出したいファイルを指定する
// importしたデータは定数として扱われる = 再代入不可
import { letA as la, funcA } from './A.js';
// asで書き換えは可能
console.log(la);
// console.log(letA); // 使えなくなる

// as で変更したら新たに定義することは可能
let letA = 'hello';

funcA();

/*
import - 全部import（* as をつける）
どのデータをimportしているかわかりにくい
*/
import * as A from './A.js';
console.log(A);
A.funcA();

/*
default
*/
import A from './A.js';
import A2 from './A.js';
console.log(A);

/*
defaultと名前付きを一緒にimportする方法
*/
// デフォルトimportを先に記述 省略も可能
import A, { letA } from './A.js';

// ファイルを実行するだけの記述 = A.jsの内容を一度走らせる
import './A.js';
import './C.js';

/*
データは番地で共有される
*/
import { letA, funcA, C } from './A.js';

console.log('main.js');
console.log(letA); // let2

funcA();
console.log(letA); // letA3

import { C } from './C.js';

console.log(C);

/*
モジュール自身に関するメタ情報が入っているオブジェクト
*/
console.log(import.meta);

/*
動的import
*/
if (true) {
  // 代入できる
  let fileName = './C.js';
  // import()はPromiseを返す
  // モジュールのロード・評価が終わるまで処理を停止
  const result = await import(fileName);
  // 処理が完了したらresultに代入される
  console.log(result);
}

/*
import属性 - with
*/
import data from './data.json' with { type : 'json'};
import data2 from './data.json' with { type : 'json'};
import data3 from './data.json' with { type : 'json'};
export { default } from './data.json' with { type : 'json'};
// キャッシュされたオブジェクトを変更しているのでdata2やdata3にも反映される
data.id = 'hello'
console.log(data === data2); // true
console.log(data2 === data3); // true
// 動的 import
let json = 'json'
const data4 = await import('./data.json',{
  with:{
    type: json
  }
})
console.log(data4)

// cssもimport可能
import style from './style.css' with { type : 'css'};
console.log(style);