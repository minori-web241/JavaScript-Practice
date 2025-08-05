/*
定数と変数
*/
//定数=値が変わらない（設定値、APIキー、関数、オブジェクト、配列など）
const hello = 'hello';
//変数=値が変わる（スコア、カウンターなど）
let count = 0;
count = 30;

/*
記法
*/
//キャメルケース camelCase
let tomatoCount;
//スネークケース snake_case
let tomato_Count;

/*
計算
*/
//算術演算子
let additionResult = 2 + 5;

let result = 5;
result = result;
result = result + 10;
// 省略記法 上記と同意義（=加算代入）
result += 10;
// 引き算なら -=（例：count -= 1;）
// 掛け算なら *=（例：price *= 1.1;）
// 割り算なら /=（例：total /= 2;）

result += 1;
// 1の場合のみの書き方 -も可能
// 基本はresult += 1;を使うようにする
// 後で1加える
result++;
// 先に1加える
++result;
//値を返す式の中なら：++result（前置）か result++（後置）の違いを意識すればいい

/*
データの型（1.string 2.number）と動的型付け
*/
//number型
number = 10;
//string型（文字列）
let string = 'Hello';
//「動的型付け」変数の型をあらかじめ決めなくていい、あとから違う型を代入してもOK
string = 1;
string = true;

/*
string型の書き方（シングルクォート、ダブルクォート、バッグクォート）
*/
const userName = 'minori';
string = 'hello' + userName + '!';
//バッグクォートのみ、埋め込むことができる
string = `hello ${userName}!`;
//特殊文字を使用するには、違うクォートで使用する
string = "'``'";
//バックスラッシュでも良い
string = ' \\ ';
//改行
string = ' hello\n minori ';
//バッククォートは改行もできる
string = `hello

minori`;

/*
型の変換が行われる方法
*/
let trans = 0;
trans = 10 + 10;
//+演算子の場合、number型は自動的にstring型に変換される
trans = '10' + 10; // 1010になる
//+演算子以外は、string型がnumber型に変換される
trans = '10' - 10; // 0になる
//string型にnumber型をかけた場合
trans = 'hello' * 10; //NaN(not a number)を返す NaNはnumber型

/*
明示的に型を変換する方法
①string型→number型
*/
const userInput = '10.9';
let calcResult;

calcResult = userInput + 10;
//string型をnumber型にしたいとき
calcResult = Number(userInput) + 10; // 20.9になる
//string型を整数のnumber型にしたいとき
calcResult = parseInt(userInput) + 10; // 20になる、10.9の小数点は無視される
//string型を少数のnumber型にしたいとき
calcResult = parseFloat(userInput) + 10; // 20.9になる
// 同じ意味になるが可読性が低い...？
calcResult = +userInput + 10;

/*
明示的に型を変換する方法
②number型→string型
number型の場合は自動的に文字列に変換されるから基本的には不要...？
*/
const tenNumber = 10;
// 下記でも自動的に文字列に変換されるが...
calcResult = '10' + tenNumber; // 1010
// 明示的に示す場合
calcResult = '10' + String(tenNumber); // 1010
// 同じ
calcResult = '10' + tenNumber.toString(); // 1010

/*
データの型（3.真偽値）
*/
let boolean = true;
boolean = false;

/*
データの型（4.配列 = 厳密に言えばObject）
*/
let array = ['apple', 'banana', 'grape'];
array = [1, 2, 3];
array = [1, 'apple', true, array]; // 変数も入れられる
// console.log(array[0]); // 一番最初は0から始まる

// array = []; // 空にする
array.push('apple'); // 配列の最後に追加

/*
データの型（5.オブジェクト）
オブジェクト ＝ キーとバリューがたくさん並んでいるもの
キーとバリュー = プロパティ
オヴジェクトには、string、number、boolean、Array、Objectを入れることができる
*/
const coffee = {
  name: 'Chocolate Mocha', // nameプロパティなどと呼ぶ
  size: 350,
  isHot: true,
  toppings: ['Cinnamon', 'Caramel'],
  nutritions: {
    calories: 430,
    sugars: 53,
    caffein: 100,
  },
};
// console.log(coffee);
// console.log(coffee.size); // ピリオドで特定のプロパティのにアクセス可能
coffee.isHot = false; // バリューを変更したいとき
coffee.barista = 'Minori'; // プロパティを追加したいとき

/*
データの型（6.null = Object）
データの型（7.undefind = undefind）
*/
// 「値が存在しない」ことを明示
null;
// 「値が未定・未定義」
undefined;

/*
typeof演算子
変数の「データ型」を調べる演算子
*/
typeof 123; // number
typeof 'hello'; // string
typeof true; // boolean
typeof [1, 2, 3]; // object 配列は objectになる
typeof undefined; // undefined
typeof null; // objectになる！！

/*
関数
*/
// object以外の{}には;はつけない
function add() {
  console.log('minori');
}
// 呼びださないと使用できない
add();

function add(num1, num2) {
  //num1, num2は仮引数 = パラメータ
  console.log(num1 + num2);
}
add(2, 3); // 引数
add(10, 3);
add(20, 1);

/*
関数 return
*/
function demo(num1, num2) {
  return num1 + num2;
}

const returnValue = demo(100, 3); // 戻り値
console.log(returnValue);

/*
スコープ（グローバル、ローカル）
object以外の{}をブロックスコープともいう
*/
