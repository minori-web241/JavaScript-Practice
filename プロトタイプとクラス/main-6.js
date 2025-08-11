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
ファクトリー関数
*/
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

// 変数名はパスカルケースにする
let UserFactory = (name, age) => {
  return {
    name,
    age,
    greeting() {},
  };
};

// user4などは「インスタンス」という
const user4 = UserFactory('sakura', 28);
const user5 = UserFactory('ino', 29);
const user6 = UserFactory('rock', 30);

/*
コンストラクタ関数
アロー関数はだめ
*/
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
共通しているメソッドの関数オブジェクトを簡潔にする場合
上記のファクトリー関数、コンストラクタ関数は同様の関数を各objに共有しておりメモリを余分に占めてしまう
*/
// 方法1 関数を別で定義して、オブジェクトに入れる
const greeting = function () {
  return `Hi! This is ${this.name}. I am ${this.age} years old.`;
};
// 方法2 ファクトリー関数でプロトタイプに入れる場合
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

const user10 = UserFactory2('hanako', 28); // prototypeの中にgreetingが入っている
const user11 = UserFactory2('tarou', 29);

// 方法3 コンストラクタ関数でのプロトタイプに入れる場合
const UserConstructor2 = function (name, age) {
  // this{} // 厳密には下記が生成される
  // this = Object.create(UserConstructor2.prototype); // thisの初期値
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

console.log(UserConstructor2.prototype === user12.__proto__); // true
console.log(user12.__proto__ === user13.__proto__); // true

/*
new.target
コンストラクタ関数内で使用するとコンストラクタ関数を返す
普通の関数内で使用するとundefined
*/
const UserConstructor3 = function (name, age) {
  console.log(new.target);
  this.name = name;
  this.age = age;
};

/*
class構文
コンストラクタ関数の上位互換
class内はデフォルトでstrictモード
*/
class User {
  // constructorメソッド = コンストラクター関数でいう、メインの処理と同じになる
  // インスタンスが使うデータを準備する場所
  // newで呼び出されて真っ先に実行される
  constructor(name, age) {
    // this = Object.create(Animal.prototype)
    this.name = name;
    this.age = age;
  }
  // prototype内に関数を入れることができる
  // 省略記法のメソッドしか書けない それ以外はエラー
  greeting() {}
  post() {}
}

// 呼び出す時は new をつけて呼び出す
const user = new User('minori', 28);

/*
class構文
getterとsetter
*/
class User2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  get greeting() {} // get つけるだけ
  set post(value) {} // set つけるだけ
  // 内部的に下記のようなコンストラクタ関数の処理を簡単にできる
  // Object.defineProperty(変数名.prototype,''){ get(),set()}
}
console.dir(User2); // prototype内にget greetingとset postが追加されている

/*
staticキーワード
*/
// メソッドがclassのプロトタイププロパティに入るのではなく、classに直接入る
// メソッドの前にstaticを記載する
class User3 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  static greeting() {}
  // 下記と同じような処理になる
  // User.greeting = function () {}
  static get greeting() {} // getterにも使える
  set post(value) {}
}

/*
フィールド
＝プロパティのこと
classの外で this.xxx = … と書く代わりに、クラス本体で宣言できるようになった
*/
class User4 {
  // 内部的にはObject.defineProperty(this, 'name', { value : name})で追加されている
  // Publicフィールド（クラス定義時に初期値を設定できる）
  name = 'default'; // フィールド（this.name）
  age = 0; // フィールド（this.age）

  // {}内に処理を記載することも可能
  static {}

  // Privateフィールド
  #password = 0;
  constructor(name, age) {
    this.name = name;
    this.#password = 0; // classの中からしかアクセスができない
  }
  greeting(user) {
    console.log(user.#password);
  }
  get password() {
    return this.#password;
  }
}

// Privateフィールド
// console.log(User4.#password); // エラーになる

const user14 = new User4('minori', 28);
const user15 = new User4('tarou', 30);

/*
classの継承 - extends
親のフィールドやメソッドをそのまま子で使えるようにする
必要なら子クラス側で追加・上書きもできる。
*/
// 親クラス = スーパークラス
class Animal {
  age = 0;
  constructor(age) {
    this.age = age;
  }
  static eat() {}
}

// 子クラス = サブクラス
// extends 親クラスを継承して子をつくっている
// extendsの右側は式ならなんでも入る
class Bird extends Animal {
  // extendsが内部的にやっていること
  // ①Bird.__proto__ === Animal // true
  // → 静的メソッド（Animal.staticMethod）もBirdで使えるようになる
  // ②Bird.prototype.__proto__ === Animal.prototype // true
  // → Animal.prototype にあるメソッド（eat()）を Bird のインスタンスから使えるようになる。
  name = 'bird';
  constructor(age, name) {
    // superは親クラスのコンストラクタ関数を指す
    // 必ずsuperコンストラクターを呼び出さなければいけない
    super(age);
    this.name = name;
  }
  fly() {}
}
const bird = new Bird(3, 'pi');

/*
super.
親のプロトタイプにあるメソッドやプロパティへアクセスするためのキーワード
省略記法のメソッド内であればどこでも使用可能
super.はsetterのように扱うと、this.と置き換えることができる
*/
class Animals {
  age = 0;
  constructor(age) {
    this.age = age;
  }
  eat() {
    console.log('eat from Animals');
  }

  static foo() {
    console.log('foo');
  }
}

class Rabbit extends Animals {
  name = 'rabbit';
  constructor(age, name) {
    super(age);
    this.name = name; // super.name = name;と同じ
  }
  eat() {
    super.eat(); // 親のメソッドを上書きせず、追加できる
    console.log('eat from rabbit');
    // ①setterのように扱った場合
    super.name = 'minori-dayo'; // ②this.nameと同じ
  }
  jump() {}
}
const rabbit = new Rabbit(3, 'pyon');
rabbit.eat();
console.log(rabbit);

/*
super.はオブジェクトでも使える
*/
// super.をgetterとして扱った場合は、メソッドが所属するobjのプロトタイプになる
const animalObj = {
  age: 0,
  eat() {
    console.log('eat from Animal obj');
  },
};

const rabbitObj = {
  age: 1,
  eat() {
    console.log('eat from rabbit obj');
    // ①setterのように扱った場合
    super.name = 'pyon'; // ②this.nameと同じ

    // ③getterのように扱った場合 (= super.nameを取得しようとすると)
    // rabbitObj.__proto__ === super.name
    console.log(super.name); // undefinedになる
  },
};
rabbitObj.eat();
console.log(rabbitObj);

/*
コンポジション 継承より簡潔でわかりやすい
必要な機能を組み合わせる
？？？？？？引き継ぎたいクラスのインスタンスを書き込む？？？？？？？
*/
class Dog {
  name = 'dog';
  constructor(age, name) {
    // プロパティを作り、インスタンスを入れ込む
    this.animal = new Animals(age); // ageプロパティやメソッドが入っている
    this.name = name;
  }
  eat() {
    this.animal.eat();
    console.log('eat from dog');
  }
  static jump() {
    Animal.foo;
    console.log('jump');
  }
}
const dog = new Dog(5, 'pyon');

console.log(dog.animal.age); // 5

// this.animal.eat();で 'eat from Animals' と 'eat from dog'が呼び出せる
dog.eat();
// Animalのstaticメソッドも呼び出せる
Dog.jump();

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
