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

/*
Math オブジェクト
*/
// Math.trunc
// 小数点を消す
Math.trunc(3.6); // 3
Math.trunc(-3.6); // -3

// Math.floor
// 負に合わせる
Math.floor(3.6); // 3
Math.floor(-3.6); // 4

// Math.ceil
// 正に合わせる
Math.ceil(3.6); // 4
Math.ceil(-3.6); // -3

// Math.round
// 四捨五入
Math.round(3.6); // 4
Math.round(3.5); // 4 正では大きい方に
Math.round(-3.6); // -4 負では小さい方に

// Math.random
// 0-1を含まない数をランダムに出力する
Math.random();

// Math.max
// 一番大きい数字
Math.max(4, -5, 2, 32, 1); // 32

// Math.min
// 一番小さい数字
Math.min(4, -5, 2, 32, 1); // -5

/*
BigInt型
Number.MAX_SAFE_INTEGER → 9,007,199,254,740,991
BigIntはこの制限を超える整数も正確に扱える
*/
let bigInt = 1234567890n; // bigint
bigInt = BigInt(123456789); //bigint
bigInt = BigInt('123456789'); // bigint
console.log(typeof bigInt); // bigint
