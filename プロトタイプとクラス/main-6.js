/*
Prototype
オブジェクトの応用的な機能
*/
// prototypeプロパティを全てのオブジェクトは内部的に持っている
// 値はオブジェクトまたはnullのみ

// プロトタイプチェーン ＝ オブジェクトが持つ __proto__（プロトタイプ）を辿ることで、継承元のプロパティやメソッドを参照できる仕組み

const obj = {
  a: 1,
  b: 2,
  // [[prototype]]: p1,
};

const p1 = {
  c: 3,
  // [[prototype]]: p2,
};

const p2 = {
  c: 4,
  d() {
    return this;
  },
  // [[prototype]]: null,
};

// 下記のようにずっと辿り続ける
obj.a; // 1
obj.b; // 2
obj.c; // 3
obj.d; // 4
obj.e; // undefined

// 値をgetする場合のみにprototypeプロパティまで追う 追加はobj
// obj.d(); // {a:1,b:2} thisはプロトタイプチェーン上のどこにいようが先頭のobjを指す
obj.c = 5; // const objに代入される

/*
Prototype
操作方法
*/

const obj2 = {
  a: 1,
  b: 2,
};

console.log(obj2);

// オブジェクトを作成したときに、protoタイプのプロパティの値としてオブジェクトを用意してくれている
console.log(obj2.toString());
// protoタイプを直接みる
console.log(obj2.__proto__);

// prototypeを書き換えることもできる しかし、__proto__は後方互換性のために残存、現在非推奨
// 方法１
obj2.__proto__ = {
  c: 3,
};

// 方法2
// 既存のオブジェクトのプロトタイプを proto に書き換える = パーフォーマンスへの影響あり
Object.setPrototypeOf(obj, { c: 3 });

// 方法3
// 新しいオブジェクトを作成し、そのプロトタイプとして proto を設定する
const obj3 = Object.create({ c: 3 });

// 方法4
// 参照専用 オブジェクト obj が持つ現在のプロトタイプを取得する
Object.getPrototypeOf(obj, { c: 3 });

/*
for inループとObject.keysの違い
*/
// for in だけがプロトタイプも見る ※ for in はあまり使用しない
for (const key in obj2) {
  console.log(key); // a,b,c
}
// プロトタイプはループしない
for (const key of Object.keys(obj2)) {
  console.log(key); // a,b
}

/*
クラス
似たようなオブジェクトをたくさん作る設計図
*/

// 例えばuserをたくさん作りたいとき
const user1 = {
  name: 'minori',
  age: 28,
  greeting() {},
};

const user2 = {
  name: 'naruto',
  age: 29,
  greeting() {},
};

const user3 = {
  name: 'sasuke',
  age: 30,
  greeting() {},
};

// 上記を関数にまとめるとシンプルにできる = factory関数
// パスカルケース = 似たようなオブジェクトを作成したいんだなとわかる
let UserFactory = (name, age) => {
  return {
    name,
    age,
    greeting() {},
  };
};

const user4 = UserFactory('sakura', 28);
const user5 = UserFactory('ino', 29);
const user6 = UserFactory('rock', 30);

// 上記の専用の関数がある = コンストラクタ関数（アロー関数はだめ）
// 呼び出すときに new演算子 をつける
const UserConstructor = function (name, age) {
  // this{} // newをつけることで内部的に生成される
  this.name = name;
  this.age = age;
  this.greeting = function () {};
  // return this // newをつけることで内部的に生成される
};

const user7 = new UserConstructor('shikamaru', 28);
const user8 = new UserConstructor('hinata', 28);
const user9 = new UserConstructor('temari', 28);

console.log(user7);

/*
共通しているメソッドの関数オブジェクトを簡潔にする場合 上記は同様の関数を各objに共有しておりメモリを余分に占めてしまう
*/
// 方法1 関数を別で定義して、オブジェクトに入れる
const greeting = function () {
  return `Hi! This is ${this.name}. I am ${this.age} years old.`;
};
// 方法2 プロトタイプに入れる
const userPrototype = {
  greeting() {
    return `Hi! This is ${this.name}. I am ${this.age} years old.`;
  },
};
let UserFactory2 = (name, age) => {
  const user = Object.create(userPrototype);
  user.name = name;
  user.age = age;
  return user;
};

const user10 = UserFactory2('hanako', 28);
const user11 = UserFactory2('tarou', 29);

console.log(user10); // prototypeの中にgreetingが入っている
console.log(user11);

// 方法3 コンストラクタ関数の場合
const UserConstructor2 = function (name, age) {
  // this{} // 厳密には下記が生成される
  // this = Object.create(userPrototype); // thisの初期値
  this.name = name;
  this.age = age;
  // this.greeting = greeting; 不要
  // return this // newをつけることで内部的に生成される
};

// 関数(アロー関数を除く)はprototypeと言うプロパティを持っている [[Prototype]]とは全く別物
UserConstructor2.prototype.greeting = function () {
  return `Hi! This is ${this.name}. I am ${this.age} years old.`;
};

const user12 = new UserConstructor2('maru', 28);
const user13 = new UserConstructor2('sankaku', 29);
console.log(user12);
console.log(user13);

console.log(UserConstructor2.prototype === user12.__proto__); // true
console.log(user12.__proto__ === user13.__proto__); // true

/*
内蔵されているコンストラクタ関数
*/
// new Object() オブジェクトを作るコンストラクタ関数 ( o = {}; と同じ)
let o = new Object({ hi: 'hi' });
Object.prototype.hello = 'Hello'; // prototypeの中にhelloが入る
o = {}; // ここにもhelloが入る
console.log(o);

// 配列
const a = new Array('Apple', 'Banana');
console.log(a);

// 関数
const f = new Function('a', 'b', 'return a + b');
console.log(f(3, 4));

/*
hasOwnProperty
*/
o = {
  a: 1,
};
console.log(o);
// aが存在するか確認
console.log(o.hasOwnProperty('a')); // true
// in演算子との違い = in演算子はプロトタイプチェーンまで全部見る
console.log(o.hasOwnProperty('hello')); // false
console.log('hello' in o); // true

// プロトタイプのメソッドはthisを使用しているため、下記の記述ではオブジェクトを指定していない
console.log(Object.prototype.hasOwnProperty('a')); // false
// 上記と全く同じ
console.log(Object.hasOwn('a')); // false
// callでオブジェクトを使用できる
console.log(Object.prototype.hasOwnProperty.call(o, 'a')); // true

/*
new.target
// コンストラクタ関数内で使用するとコンストラクタ関数を返す
// newオブジェクトのtargetプロパティという意味ではない = new.targetはセット
// 普通の関数で使用するとundefined
*/
const UserConstructor3 = function (name, age) {
  // this = Object.create(userPrototype);
  console.log(new.target);
  this.name = name;
  this.age = age;
  // return { hello: 'hello' }; // returnを使った場合は全てオブジェクトで上書きされる
  // return 'hello'; // 文字列の場合は無視される
  // return this
};

UserConstructor3.prototype.greeting = function () {
  return `Hi! This is ${this.name}. I am ${this.age} years old.`;
};

const user14 = new UserConstructor3('circle', 28);
const user15 = new UserConstructor3('shikaku', 29);
console.log(user14);
console.log(user15);

/*
class構文
// コンストラクタ関数の上位互換
*/
class User {
  // constructor = コンストラクター関数でいう、メインの処理と同じになる
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  // {}の中身には、省略記法のメソッドしか書けない それ以外はエラー
  // メソッドを羅列することで、prototype内に関数を入れることができる
  greeting() {}
  post() {}
}
console.dir(User); // 関数オブジェクト（内部的には区別されている）

// 呼び出す時は new をつけて呼び出す
const user = new User();
console.dir(user1);
