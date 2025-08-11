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

/*
Dateオブジェクト
コンストラクター関数になる
*/
// 内部的に時間を所持している
let date = new Date();
console.dir(date);

// 1970年1月1日 00:00:00 UTC（協定世界時）からの経過時間を、ミリ秒単位で返すメソッド
date.getTime();

// ブラウザならOS設定のタイムゾーンで決定される
date.getFullYear(); // 2025
date.getMonth(); // 7 (0スタート)
date.getDate(); // 11
date.getHours(); // 16
date.getMinutes(); // 46

// 文字列で記載
// 内部は省略もできる
new Date('2025-08-11T16:54:20+09:00'); // Mon Aug 11 2025 16:54:20 GMT+0900 (日本標準時)

// 数値型はタイムゾーンの指定はできない
new Date(2025, 08, 11, 3, 30); // Thu Sep 11 2025 03:30:00 GMT+0900 (日本標準時)

// date.set〜で変更できる
date.setDate(date.getDate() + 1); // 明日を指定する

// 日付を算術演算子
new Date() - date; // -86396292
new Date() > date; // -true
new Date() < date; // -false

/*
Dateのstaticメソッド
*/
// Date.now()
// 時間を指定してタイムスタンプをとる
Date.now(); // 1754901234567（現在時刻のミリ秒）

// Date.parse()
// 日付文字列 → ミリ秒（1970/1/1 UTCからの経過時間）に変換する
Date.parse('2025-08-11T00:00:00Z'); // 1754870400000（ミリ秒）

/*
String.prototype
*/
let apple = 'I like apples';

// 開始位置 > 終了位置の場合は空文字列が返る
result = apple.slice(6, 1); // ""

// 前後の空白文字を除去（元の文字列は変わらない）
result = apple.trim(); // "I like apples"

// 引数が ''（空文字）だと1文字ずつ配列化
result = apple.split(''); // ["I", " ", "l", "i", "k", "e", " ", "a", "p", "p", "l", "e", "s"]

// 最初に一致した 'like' を 'love' に置き換える
result = apple.replace('like', 'love'); // "I love apples"

// 文字列が 'I love' で始まっているかを判定
result = apple.startsWith('I love'); // false

// 文字列が 'apple' で終わっているかを判定（末尾は 'apples'）
result = apple.endsWith('apple'); // false

// 'apples' が最初に現れる位置（0スタート）
result = apple.indexOf('apples'); // 7

// 開始位置に負の値を渡すと 0 として扱われる（末尾からのオフセットではない）
result = apple.indexOf('l', -3); // 10

// 見つからない場合は -1
result = apple.indexOf('banana'); // -1
