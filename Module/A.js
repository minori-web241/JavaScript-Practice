/*
export文
*/

// // 宣言
export const A = 'A';
export let letA = 'A';
export var varA = 'A';
export function* generatorFuncA() {}
export async function asyncFuncA() {}
export async function* asyncGeneratorFuncA() {}
export class ClassA {}
// console.log(letA);

// 定義した段階でexportを記載していない場合は、まとめてexportすることも可能
export { generatorFuncA, asyncFuncA };

/*
default - 1ファイル1つ
*/
export default 'A';

すでに定義されている関数をdefaultにしたい場合
export { asyncGeneratorFuncA as default };

/*
B.jsをimportした場合
*/
import './B.js'; // 先にBが実行される
console.log('A.js');

/*
データは番地で共有される
*/
letA = 'let2'; // let2

export function funcA() {
  letA = 'letA3';
  console.log('funcA');
}

// C.hello = 'hello'; // アクセスできる

// import { C } from './C.js';
// export { C } ;

/*
再エクスポート - 複数選択も可能
*/
export { C } from './C.js';
export * from './C.js';
