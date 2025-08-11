/*
標準ビルトインオブジェクト
JavaScriptエンジンが 最初から提供している、あらかじめ定義されたオブジェクト
*/

/*
primitive値の扱い
オブジェクトのように扱われたら、内部的に new〜をしている
ラッパーオブジェクト = primitive値を一時的にオブジェクトとして扱えるようにする仕組み
*/

// toFixed
// 小数点以下n桁に丸めて文字列
let count = 1.23456;
let result = count.toFixed(2); // 1.23
// 内部的に new Number(count).toFixed(2);

let userInput = 'hello';
result = userInput.toUpperCase(); // HELLO
// 内部的に new String(userInput).toUpperCase(2);

/*
Number
*/
// toString()
// 指定した基数の文字列に変換
// 数値.toString(基数);
result = (10).toString(2); // 1010

// parseInt(str, radix)
// 指定した基数の文字列を10進数に変換
result = Number.parseInt('1010', 2); //10

console.log(result);

/*
Number.Max_VALUE
*/
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308

/*
Number.Max_SAFE_INTEGER
*/
console.log(0.1 + 0.2); // 0.30000000000000004

/*
isNaN
*/
Number.isNaN(); // false
Number.isNaN(32); // false
Number.isNaN(NaN); // true

/*
isFinite
*/
// 下記の3つだけfalse
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
