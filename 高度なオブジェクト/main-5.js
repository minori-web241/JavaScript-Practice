/*
高度なオブジェクト
*/
// キーは全て文字列
const interests = 'interests';
const Person = {
  name: 'Minori',
  age: 28,
  greeting: function () {}, // メソッド
  const: 'const',
  'current city': 'Tokyo', // 文字列でキーを定義できる
  3: 3, // 数字でキーを定義できる（小数点も可）
  [interests]: ['programming', 'travel'],
};

/*
プロパティにアクセスする方法
*/
//ドット記法.は固定キー（ソースに書いた文字列キー）。
//ブラケット記法[] は“式の結果”をキーにする
// オブジェクトのキーは全てstring
console.log(Person.name);
console.log(Person['name']);

// オブジェクトのキーを取得する
for (const key in Person) {
  // console.log(key);
}
// オブジェクトのキーを配列で取得できる
// Objectはグローバルオブジェクトのオブジェクト
console.log(Object.keys(Person));

// 上記のfor in 文と同じ結果になる
for (const key of Object.keys(Person)) {
  console.log(key);
}

// オブジェクトのvalueを配列で取得できる
console.log(Object.values(Person));
// オブジェクトのキーと値を配列で取得できる
console.log(Object.entries(Person));

// 配列の順番は正の整数から始まる

/*
delete演算子
*/
// オブジェクトのプロパティを削除する
delete Person.age;

// 余談、編集したいとき
Person.name = 'Jack';
// 余談、追加したいとき
Person.gender = 'male';

/*
プロパティの省略記法
*/
const name = 'Espresso';
const size = 350;
const coffee = {
  name, // name: nameと同じ
  size, // size: sizeと同じ
  nutritions: {
    calories: 5,
    sugars: 0,
  },
};
const coffee2 = coffee; // アドレスを比べている
console.log(coffee2 === coffee); //true

/*
スプレッド構文
シャローコピー（一階層目のコピー 二階層目以降は参照が共有）
ディープコピー
*/
const coffee3 = {
  ...coffee, // coffeeのオブジェクトがそのままコピーされている
  isHot: true, // 追加できる
  name: 'matcha', // あとに追加したものが上書きされる
  // ディープコピー（新しいオブジェクトを作成する）にする方法
  // nutritions: {
  //   ...coffee.nutritions,
  // },
};
coffee3.nutritions.calories = 180; // coffeeのcaloriesが5ではなく180になってしまう = アドレスを共有してしまうため（シャローコピー）
console.log(coffee);

/*
object.assign
スプレッドとの違い：既存のオブジェクトに入れ込む
*/
// targetにsource...が結合されていく
// Object.assign(target, source1, source2, ...);

const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { a: 3, b: 2, c: 1 };
const newObj = Object.assign(o1, o2, o3); // {}o1の内容にo2,o3の内容を入れ込む
console.log(newObj === o1);

// 下記の記法でスプレッド構文と全く同じになる:どちらの記法でもOK
const newCoffee = Object.assign({}, coffee, { isHot: false }); // 新しいオブジェクト{}にcoffeeを入れる
console.log(newCoffee);

/*
分割代入
*/
const book = {
  title: 'JavaScript course',
  price: 9.99,
  author: {
    firstName: 'mino',
    lastName: 'ri',
  },
  isbn: 1234567890,
  description: 'about JavaScript',
};

// 通常の取り出し
// const title1 = book.title;
// const price1 = book.price;

// まとめて取り出す
const { title, price } = book;
console.log(title, price);
// 変数名に代入できる
const {
  title: bookTitle,
  price: price2,
  author: { firstName, lastName }, // 直接値を取りたいとき
  publisher: pub = 'minori inc', // デフォルトを指定できる
  ...etc // ...で取得していない残り全て
} = book;
console.log(bookTitle, price2, firstName, lastName, pub, etc);

// 下記も全く同じ
// 関数のパラメータでの分割代入は、“まず引数を受け取ってから分割代入する” のを1行で書ける
const sayBook = ({ title: bookTitle, price: price2, author: { firstName, lastName }, publisher: pub = 'minori inc', ...etc }) => {
  console.log(bookTitle, price2, firstName, lastName, pub, etc);
};
sayBook(book);

/*
in演算子
'key名' in オブジェクト
左側 → 調べたいキー（文字列またはSymbol）
右側 → 調べる対象（オブジェクトや配列）
*/
'title' in book; //true

/*
オプショナルチェーン（Optional Chaining）
*/
let user = undefined;
// console.log(user.adress); // エラーになる
// ?の前の式がnullかundefinedなら、次の値を評価せずにundefinedを返す
console.log(user?.adress);

/*
This
*/
// console.log(window);

// le(Lexical environment)
// - global: global object
// - this: global object
// thisはそれぞれのle毎についている
console.log(this); // thisの値は関数の呼び出し方によって異なる

// le
// - outerEnv: global
// - this: strict ? undefined : global object
let sayThis = function () {
  console.log(this);
};
sayThis();

// this.alert = 'minori'; // 上書きでもできる

/*
メソッドの場合（無名関数ver）
*/

// le
// - outerEnv: global
// - this: car
const car = {
  color: 'red',
  sayThis, // 省略記法
  changeColor: function (color) {
    // car.color = color; // carオブジェクトにしか対応しない
    this.color = color; // オブジェクトに柔軟に対応できる
  },
};
// car.sayThis(); // メソッドで呼び出した時のthisはオブジェクトになる

const car2 = { ...car };
car2.changeColor('white');
console.log(car); // red
console.log(car2); // white

const temObj = {
  car,
};
temObj.car.sayThis; // thisはcarオブジェクトを指す

/*
メソッドの場合（アロー関数ver)
特徴：thisは持たない
メリット：メソッドの中でコールバック関数をかくとき
*/

// le - (changeColor)
// - outerEnv: global
// - this: car

// le - (logging())
// - outerEnv(関数が作られたところ): global

// le - (cb())
// - outerEnv: desk.changeColor
// - this: strict ? undefined : global object
// - this: アロー関数にしたら、thisが存在しなくなり、outerEnvを参照する

let logging = (cb) => console.log(cb());

const desk = {
  color: 'red',
  sayThis,
  changeColor: function (color) {
    // logging(function () {
    //   return this.color;
    // }); // thisはundefinedになる
    logging(() => {
      return this.color;
    }); // アロー関数にすることで、thisを持たなくなりundefinedではなくなる
    this.color = color;
  },
};
desk.changeColor('pink'); // pinkになる

/*
call
apply
*/

sayThis = function (a, b) {
  console.log(this, a, b); // この時点でのThisは決まっていない＝呼び出し方で決まる
};
// callは引数をカンマで
sayThis.call({ hello: 'hello' }, 1, 2);
// applyは引数を配列で
sayThis.apply({ hello: 'hello' }, [1, 2]);

/*
bind
*/
// 関数を呼び出すのではなく、新しく関数を作り出す＝thisがこのオブジェクトとなる関数を作り出している
// bindの返り値は関数オブジェクト
// アロー関数内で定義したらアロー関数が勝つ 引数はbindで固めることはできる
sayThis = sayThis.bind({ hello: 'hello' }, 1); // ここで入れた引数は不変
sayThis(2); // {hello: 'hello'} 1 2 になる

/*
メソッドの省略記法
*/
const obj = {
  color: 'red',
  // changeColor: function (color) {
  //   return this.color;
  // },
  // :functionを省略することができる
  changeColor(color) {
    return this.color;
  },
};

/*
getter
*/
const pastaCalculator = {
  servingSize: 60,
  member: 4,
  // 下記は自分のプロパティは参照できない
  // total: pastaCalculator.servingSize * memberCalculator.member,
  // 下記はglobalオブジェクトを指すので不可=thisをオブジェクトにするには関数で呼び出す必要がある
  // total: this.servingSize * this.member,
  get total() {
    return this.servingSize * this.member;
  },
};
// totalは関数なので下記のようにアクセス
// console.log(pastaCalculator.total());

// get 関数()にすると、下記のようにプロパティにアクセスすることができる
console.log(pastaCalculator.total);

/*
setter
プロパティに値を代入して関数を実行したいとき
getとsetの関数名が重複している場合は、
*/
const curryCalculator = {
  servingSize: 60,
  member: 4,
  // getter: プロパティを参照すると自動実行される
  get total() {
    return this.servingSize * this.member;
  },
  // setter: プロパティに代入すると自動実行される
  set total(newValue) {
    this.member = newValue / this.servingSize;
  },
  // total: 240; // プロパティ名が重複していると最後の記述が有効になってしまう
};
// set 関数（引数）にすることで、下記のようにプロパティに値を代入できるようになる
curryCalculator.total = 600;
// 実行はgetを参照
console.log(curryCalculator.total); // 600になる

/*
PropertyDescriptor
厳密には、プロパティはキーと4つの属性から成っている

▼PropertyDescriptor（変更・追加できる）

// デフォルトはtrue
Key(servingSize):
configurable: true
enumerable: true
value: 60
writable: true
*/
const ramenCalculator = {
  servingSize: 60,
  member: 4,
};

console.log(Object.getOwnPropertyDescriptor(ramenCalculator, 'servingSize'));

// Object.defineProperty = 既存のPropertyDescriptorを変更することができる
Object.defineProperty(ramenCalculator, 'servingSize', { value: 30 });
console.log(Object.getOwnPropertyDescriptor(ramenCalculator, 'servingSize')); // value: 30

/*
writable
*/
Object.defineProperty(ramenCalculator, 'servingSize', { writable: false });
ramenCalculator.servingSize = 100; // これは無効になる
// 変更可否を設定できる falseなら代入が不可能に ただしdefinePropertyで上書きは可能
Object.defineProperty(ramenCalculator, 'servingSize', { value: 30 }); //  value: 30

/*
enumerable
*/
// ループの可否 falseであればループで無視される Object.keysでも無視
// getOwnPropertyNamesでは出力される
// falseのものはコンソールログで薄く表示される
Object.defineProperty(ramenCalculator, 'servingSize', { enumerable: false });
for (const key in ramenCalculator) {
  console.log(key); // memberのみが返る
}

/*
configurable
*/
// 他の属性の変更が不可能（エラー）
// valueだけは変更できる
// writableをtrueからfalseに変更もできる
// delete演算子が使用できない
Object.defineProperty(ramenCalculator, 'servingSize', { configurable: false, value: 900 });
delete console.log(ramenCalculator.servingSize);

/*
プロパティを追加する方法
*/

// definePropertyで追加した場合は、指定していない属性の値は全部falseになる
Object.defineProperty(ramenCalculator, 'children', { writable: true });
// 今回の場合は、// configurable:false,enumerable:false,value:undefined
console.log(Object.getOwnPropertyDescriptor(ramenCalculator, 'children'));

/*
プロパティを複数設定する方法 追加も変更もできる
*/
Object.defineProperties(ramenCalculator, {
  // servingSize: { value: 30, enumerable: true },
  // children: { value: 2 },
});

// 全てのPropertyDescriptorを一括で取得する方法
// falseも取得する
Object.getOwnPropertyDescriptors(ramenCalculator);

/*
getterとsetterをdefinePropertyを使って定義する
*/
const sushiCalculator = {
  servingSize: 80,
  member: 6,
  // get total() {
  //   return this.servingSize * this.member;
  // },
  // set total(newValue) {
  //   this.member = newValue / this.servingSize;
  // },
};

Object.defineProperty(sushiCalculator, 'total', {
  configurable: true,
  enumerable: true,
  get() {
    return this.servingSize * this.member;
  },
  set total(newValue) {
    this.member = newValue / this.servingSize;
  },
  // valueとwritableは共存できない！ ※valueはgetの役割、writableはsetの役割のため
});
console.log(Object.getOwnPropertyDescriptor(sushiCalculator, 'total'));
sushiCalculator.total = 800;
console.log(sushiCalculator.member);
