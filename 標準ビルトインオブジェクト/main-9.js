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

result = apple.includes('banana'); // false

/*
正規表現 - regexp.test
*/
let regexp = new RegExp('appels');
// リテラル表記で正規表現を再代入（"appels" という文字列にマッチするパターン）
regexp = /appels/;
// 大文字小文字を区別せずに判定したい場合
regexp = /appels/i;

// test() は「対象文字列がパターンにマッチするか」を true / false で返す
result = regexp.test('I like appels');

// 数字が入っていたらtrueを返したい 0-9の数字を一つ取れる
regexp = /appels\d/;
result = regexp.test('I like appels5');

// スペースならtrue
regexp = /\s/;
// 全角もtrue
result = regexp.test(' '); // true
result = regexp.test('\n'); // true

// 数字もアルファベットもアンダースコアもOk
regexp = /\w/;
result = regexp.test(' h '); // false
result = regexp.test('_'); // true

// 数字以外のもの
regexp = /\D/;

// スペース以外
regexp = /\S/;

// ワード以外
regexp = /\W/;

// 改行以外全て
regexp = /./;

// エスケープ
regexp = /\./;
result = regexp.test('.'); // true

// キャレット
// 先頭にキャレットで指定したものがあれば
regexp = /^apple/;
result = regexp.test('apple is red'); // true

// ダラー
// キャレットの逆
regexp = /apple$/;
result = regexp.test('apple is red'); // false

// appleのみ
regexp = /^apple$/;
result = regexp.test('apple'); // true
result = regexp.test('apples'); // false

// 改行
regexp = /^apple$/m;
result = regexp.test('I like \napple'); // true

// 連続で表示
regexp = /\ab{5}/;
result = regexp.test('bbabbbbbb'); // true
regexp = /a+/; // /a{1,}/; と同じ
regexp = /a?/; // /a{0,1}/; と同じ
regexp = /a*/; // /a{0,}/; と同じ
regexp = /(hey)+/; // 全体を繰り返し // heyheyheyhey

// 単語ずつとる
regexp = /I like (apple|banana|orange)/;
result = regexp.test('I like banana'); // true

// []内の一文字だけ 内部にエスケープ処理不要
regexp = /b[ua]g/;
// -で範囲を指定することができる
regexp = /b[a-z]g/;

// 応用 - メールアドレス
regexp = /[-.\w]+@([-\w]+\.)+[-\w]+/;
result = regexp.test('test@test.com'); // true

/*
正規表現 - メソッド
*/
// gフラッグ
// どのポジションから調べるか決めることができる
regexp = /[-.\w]+@([-\w]+\.)+[-\w]+/g;

// lastIndex
// regexp.lastIndex = 5; // 文字列の5番目から調べる デフォルトは0

// 複数の文字列がある場合
let mail = 'test@test.com, example@example.com';
result = regexp.test(mail); // 繰り返す lastIndexが更新される

// exec
result = regexp.exec(mail); // 繰り返す lastIndexが更新される

// search indexOfに似ている
result = mail.search('@'); // 4

// match
// 該当したものを配列にして返してくれる よく使われる
result = mail.match(regexp);

// matchAll
// gフラッグが必須
// iterable= 反復処理できるオブジェクト
result = mail.matchAll(regexp);
for (const item of result) {
  console.log(item);
}

// replace
result = mail.replace(/@/g, '*'); // gフラッグで全て

// replaceAll 正規表現を使用する必要がない
result = mail.replaceAll('@', '*');

// split
// 配列に変える
result = mail.split('@', '*');

console.dir(result);
console.dir(regexp);

/*
Errorオブジェクト
*/
// 発生したエラーは error 変数として catch ブロックに渡される
try {
  chocolate;
  // 存在しない変数にアクセスすると ReferenceError が発生する
  // 内部的に throw new ReferenceError('error message!', cause{ hello: 'hello'});
  // 第一引数に文字列、第二引数に{}など入れられる
} catch (error) {
  // 下記のErrorオブジェクトを持つ
  console.log(error.message); // error message!
  console.log(error.name); // エラーの種類（Error, ReferenceErrorなど）
  console.log(error.stack); // error.stackはデバッグ目的で使用（関数呼び出し履歴）
}
