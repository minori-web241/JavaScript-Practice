/*
if文
*/
// 真偽値で判定する
if (true) {
  // console.log('nice!');
}
// 何も表示されない
if (false) {
  // console.log('nice!');
}

/*
else , else if
*/
// 変数に代入してもok
let ok = true;
if (ok) {
  // console.log('ok!'); // こちらが表示される
} else {
  // console.log('no!');
}

ok = false;
// else （それ以外すべて）
if (ok) {
  console.log('ok!');
} else {
  // console.log('no!!!'); // こちらが表示される
}

ok = false;
let maybe = false;
// else if （新しい条件を追加してチェックする）
if (ok) {
  console.log('ok!');
} else if (maybe) {
  console.log('maybe');
} else {
  // console.log('no...'); // こちらが表示される
}

/*
演算子
*/
// イコールなら「true」
ok = 1 === 2; // 同値演算子（厳格）
// 違ったら「true」
ok = 1 !== 2;
// 下記は「true」判定になってしまう 基本使用しない
ok = 1 == '1'; // 等値演算子（ゆるい） 反対は（!=）

/*
objectでの演算子
*/
const coffee1 = { name: 'Cafe Latte' };
const coffee2 = { name: 'Cafe Latte' };
ok = coffee1 === coffee2; // 見た目は同じなのにfalseになる
const coffee3 = coffee1;
ok = coffee1 === coffee3; // 代入している場合はtrueになる
ok = coffee1.name === coffee2.name; // この場合はtrue

/*
比較演算子
*/
// 主に数字でしか使わないけど、「a>b」や「A>a」など事象順でも使える
ok = 1 > 0;
ok = 1 >= 0;
ok = 1 <= 0;

/*
TruthyとFalsy
https://developer.mozilla.org/en-US/docs/Glossary/Falsy
*/
// JavaScriptは真偽値を自動的にtrueかfalseを判断している

/*
論理演算子
*/
// AND演算子 （両方がtrueの場合のみ、true）
ok = true && false;
// OR演算子 （両方がfalseの場合のみ、false)
ok = false || false;

/*
論理演算子：値がTruthyとFalsyの場合は？
*/
// AND演算子の場合
// ①左がTruthyだったら右側の値を返す
// ②左がFalsyだったら左の値を返す
// つまり、「左がOKなら、右まで進んで確認、左がダメなら、右は見ない」
ok = 'hello' && 'minori'; // minoriになる
ok = 0 && 'minori'; // 0になる

// OR演算子の場合
// ①左がTruthyだったら左側の値を返す
// ②左がFalsyだったら右の値を返す
// つまり、「左がOKなら即採用、ダメなら右」
ok = 'hello' || 'minori'; //helloになる
ok = 0 || 'minori'; // minoriになる

// OR演算子の応用
const userInput = '';
// ユーザーネームが未入力の場合、Userに
const userName = userInput || 'User'; // よく使う！！

/*
論理演算子：優先順位
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Operator_precedence
*/
const x = 15;
ok = x > 10 && x < 20; // true
ok = x === 10 || (x > 12 && userName); // Userを返す

/*
null合体演算子
*/
// null または undefined のときだけ右の値を返す
let inputName = null ?? 'User'; // User
inputName = '' ?? 'User'; // ''

/*
真偽値の反転
*/
ok = !true; // falseになる
// Truthy / Falsy にも使える
ok = !''; // true
ok = !x; // false
// 型を真偽値に変換したいとき =  右から左に計算する
ok = !!x; // true

/*
三項演算子 (式)
if文を1行で書けるスマートな書き方 = 値が返る
頻出：見た目を切り替えるUI制御などで使用
*/
// okがTruthyなら左（OK）を返す、Falsyなら（NO）を返す
ok = 'hello';
ok = ok ? 'OK' : 'NO'; // OK
// 下記のif文と同義だが、if文はreturnがないと値を返さない
if (ok) ok = 'OK';
else ok = 'NO';

/*
Switch文

switch (条件となる値) {
  case 値1:
    // 値1に一致したときの処理
    break;

  case 値2:
    // 値2に一致したときの処理
    break;

  default:
    // どれにも一致しなかったときの処理
}
*/

function vegetableColor(vegetable) {
  // if (vegetable === 'tomato') {
  //   console.log('tomato is red!');
  // } else if (vegetable === 'pumpkin') {
  //   console.log('pumpkin is orange!');
  // } else if (vegetable === 'onion') {
  //   console.log('onion is white!');
  // }

  // switch () {} ここは波括弧が必須 式文にはできない
  // また、ブロックで囲うとブロック毎で同様の定数使用できる
  switch (vegetable) {
    case 'tomato': {
      const message = 'tomato is red';
      console.log(message);
      break; // ここで処理を止める returnでも同じ意味
    }
    case 'carrot': // 処理が流れる性質を活かして複数指定も可能
    case 'pumpkin': {
      const message = `${vegetable} is orange`;
      console.log(message);
      break;
    }
    case 'onion': {
      const message = 'onion is white';
      console.log(message);
      break;
    }
    default: {
      const message = 'not found';
      console.log(message);
    }
  }
}

// vegetableColor('carrot'); // carrot is orange
// vegetableColor('apple'); // not found

/*
ループ：while文
*/
let count = 100;
// ()内がtrueであれば{}が実行され、falseになれば終了される
// 最初からfalseの場合は実行されない
while (count < 10) {
  // console.log('while:', count);
  count += 1;
}

/*
ループ：do-while文
条件に関わらず、do内はまず確実に実行される
*/
let tomatoCount = 100;
do {
  // console.log('do-while', tomatoCount);
  tomatoCount += 1;
} while (tomatoCount < 10);

/*
ループ：for文
for (初期値; 条件式; 更新処理) {} ←これが基本形 {}ブロック以外でも良い
*/
// letやconstはカンマで複数していできる
// 「カンマ演算子」＝複数の指揮をカンマで区切れる
for (let pumpkinCount = 0, i = 0; pumpkinCount < 10; pumpkinCount += 1, i += 1) {
  // console.log(pumpkinCount);
}

/*
ループ：for-of文
配列をループしたいとき
*/
// for文の場合
const fruits = ['apple', 'banana', 'grape', 'orange', 'mango'];
for (let i = 0; i < fruits.length; i += 1) {
  // .lengthは動的に個数を取得できる
  // console.log(fruits[i]);
}
// for-of文の場合
for (const fruit of fruits) {
  // constが一般的 ループのたびに値が再代入されるので問題なし
  // console.log(fruit);
}

/*
ループ：for-in文
オブジェクトをループしたいとき（※一応配列もできる）
for (const 変数 in オブジェクト) {
変数にはkey（プロパティ名）が入る
}
*/
const coffee = {
  name: 'Caffe Latte',
  size: 350,
  isHot: true,
};

for (const key in coffee) {
  console.log(key); // name,size,isHotが返る
  console.log(coffee.name); //name Caffe Latte,size Caffe Latte...が返る
  console.log(coffee.key); // undefindを返す=keyという名前のキーを探しているから
  console.log(coffee[key]); // 正しくプロパティが出てくる=オブジェクトのキー名を1つずつ処理したいときに使う
}

/*
continue文
continueに到達すると、その回の処理だけスキップして、次のループに進む。
*/
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue;
  }
  console.log(i); // 0,1,3,4
}

/*
try-catch文
失敗の可能性がある処理を安全に実行する仕組み
*/
try {
  // ここに「エラーが起こるかもしれない」処理を書く
} catch (error) {
  // エラーが起きた時にやる処理を書く
}

/*
try-catch-finally文
*/
try {
  // 何か処理
} catch (e) {
  // エラー時の処理
} finally {
  // 成功・失敗にかかわらず必ず実行
}

/*
throw文
*/
try {
  const user = findUserByEmail(inputEmail); // 登録ユーザーを検索
  if (!user) {
    throw new Error('ユーザーが見つかりません');
  }

  const isValid = checkPassword(user, inputPassword);
  if (!isValid) {
    throw new Error('パスワードが違います');
  }

  loginUser(user); // ログイン処理
  alert('ログイン成功！');
} catch (error) {
  alert(`ログイン失敗: ${error.message}`);
}
