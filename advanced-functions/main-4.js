/*
レキシカル環境
キーとバリューがセットになっているオブジェクトみたいなもの
globalオブジェクトをその中で全て定義する
*/
/*
クロージャ
外部の変数の情報を持った関数のこと
*/
let generateParson = () => {
  return {
    name: 'Minori',
    age: 0,
  };
};
const minori = generateParson();

// console.log(minori);

let createCounter = () => {
  let count = 0;
  return () => {
    // count++;
    // debugger;
    // return count;
  };
};
const counter = createCounter();
counter();
/*
IIFE(イーフィ)即時実行関数式
()
*/
/*
再帰関数
自分自身を呼び出す関数
*/
let factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));

// console.log(factorial(3));
// console.log(factorial(5));
// console.log(factorial(0));
// console.log(factorial(200000));
/*
スタック
実行コンテキストをためておく場所
*/
const c = () => {
  return 'hello';
};
const b = () => {
  return c();
};
const a = () => {
  return b();
};
debugger;
a();
