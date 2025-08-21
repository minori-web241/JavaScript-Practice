/*
関数は、object = 値として柔軟に扱える！
*/
/*
①関数宣言
objectと変数を作り出して、変数にオブジェクトを代入する
巻き上げられる = どこでも呼び出せる
可読性が高い
*/

// addという変数を内部的に用意して、let = add {}のようにオブジェクトを代入しているに過ぎない
function add(a, b) {
  return a + b;
}
// console.log(add(10, 10));
// console.dir(add); // dir.でオブジェクトの中身が見れる

/*
②関数式
関数オブジェクトのみを作り出している
②は式に関数を代入できる、①はできない
*/
// 変数を作り出さない オブジェクトのみ 関数自体にもsayHiという関数内部のみで使える名前がつく
let sayHi = function sayHi() {};
// 上記と同意義の書き方（無名関数式anonymous）
sayHi = function () {
  return 'hi';
};
// console.log(sayHi()); // hiが返ってくる

/*
メソッド
オブジェクトのプロパティの値が関数だったとき、その関数を「メソッド」と呼ぶ
※プロパティはキーとバリューのことだけど、キーをさすことが多い（例：nameプロパティのバリューは Minori）
*/

const person = {
  name: 'Minori',
  sayHi: function () {
    return 'hi';
  },
};
// personオブジェクトのsayHiメソッドともいう
// console.log(person.sayHi());

/*
アロー関数
無名関数の置き換え
*/
// 下記2つは同じ
sayHi = function () {};
sayHi = () => {};

//
sayHi = function (name) {
  return `Hi ${name}!`;
};

// 下記2つは同じ
sayHi = (name) => {
  return `Hi ${name}!`;
};
// 一つの式の場合は{}とreturnを省略できる
// パラメータが一つの時は(name)ではなくnameと()を省略することができる
sayHi = (name) => `Hi ${name}!`;

// オブジェクトを返したい時は（）を使う
sayHi = (name) => ({ name: name });

/*
デフォルトパラメータ
*/
sayHi = (name) => `Hi ${name}!`;
console.log(sayHi()); // Hi undefinedになる
// デフォルトを指定したいとき = デフォルトパラメーター
sayHi = (name = 'User') => `Hi ${name}!`;
console.log(sayHi()); // Hi User!になる
console.log(sayHi(undefined)); // Hi User!になる

// nullや0は値ありとしてそのまま返る
console.log(sayHi(null));

/*
レストパラメータ
関数の引数の「残り全部」を、1つの配列としてまとめて受け取る
*/

// 例えば値を何個も渡したいとき都度パラメータを変更するのは手間
// let sum = (a, b, c) => {
//   return a + b + c;
// };
// console.log(sum(2, 2, 2, 5, 5, 5)); // パラメータの上限を超えるものは無視される。

let sum = (...nums) => {
  let total = 0;
  for (const num of nums) {
    total += num;
  }
  return total;
};

console.log(sum(1, 3, 4)); // 8になる

/*
コールバック関数
関数を引数として渡して、あとで呼び出す
*/
let subtract = (a, b, callback) => {
  let result = a - b;
  callback(result); // ここで呼び出す
};
subtract(10, 3, (result) => {
  console.log(result); // ここが渡す関数
});
subtract(10, 1, (result) => {
  alert(result);
});
