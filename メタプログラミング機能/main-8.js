/*
proxy
*/
// new Proxy(target, handler)
// targetはオブジェクト

let arrayLikeObj = {
  0: 0,
  1: 1,
  length: 2,
};

// 通常のgetter/setterは特定のプロパティごとに定義
// Proxyはオブジェクト全体をラップして、一括で定義
arrayLikeObj = new Proxy(arrayLikeObj, {
  // get トラップ
  get(target, prop) {
    // 1. prop が target のキーに含まれていれば
    if (prop in target) {
      // 元の値をそのまま返す
      return target[prop]; // 存在するキーを読むときは、元の値をそのまま返す
    }
    // 2. それ以外（存在しないキー）を読むときは
    return 'default'; // undefined ではなく 'default' を返す。
  },
  // set トラップ
  set(target, prop, value) {
    // 1. まずは通常のプロパティ書き込み
    target[prop] = value;
    // 2. prop を数値化してインデックスかどうかを判定
    const index = Number(prop);
    // 3. もし index が length 以上なら
    if (index >= target.length) {
      // length を index + 1 に自動更新
      target.length = index + 1;
    }
    return true; // 成功を返す
  },
});

arrayLikeObj[10] = 10; // set トラップ発火：length 11
console.log(arrayLikeObj[5]); // get トラップ発火：default

let obj = {
  hello: 'hello',
};

// handlerに{}何も指定しなければ、通常のオブジェクトのような扱いになる
let proxy = new Proxy(obj, {});
console.log(proxy);

/*
Reflect API
Reflectには他の代替方法が存在する proxyの中、または必要に応じて使用する
*/
arrayLikeObj = new Proxy(arrayLikeObj, {
  // get トラップ
  get(target, prop) {
    if (prop in target) {
      return Reflect.get(target, prop);
      // return target[prop];と全く同じ処理
    }
    return 'default';
  },
  // set トラップ
  set(target, prop, value) {
    target[prop] = value;
    const index = Number(prop);
    if (index >= target.length) {
      target.length = index + 1;
    }
    return Reflect.set(target, prop, value);
    // target[prop] = value;と全く同じ処理
  },
});

// 同じ処理
delete obj.hello;
Reflect.deleteProperty(obj, 'hello');

// 同じ処理
console.log(Object.getPrototypeOf(obj));
console.log(Reflect.getPrototypeOf(obj));

/*
Symbol
プリミティブ型のSymbol型
他のどんな値とも被らないと保証された値
*/
// Symbol = 標準ビルトインオブジェクト
// Symbol()が返す値がsymbol
let symbol = Symbol();
console.log(typeof symbol); // symbol型
console.log(symbol); // symbol

// 説明文的なのを入れることができる
symbol = Symbol('symbol1');
// Symbol.for 同じ説明文的なのを取ることができる
symbol = Symbol.for('symbol2');
// Symbol.for 同じ説明文的なのを取ることができる
symbol = Symbol.keyFor(symbol); // symbol2

/*
オブジェクトのプロパティ
symbolだけは、文字列に変換されずsymbolとして
*/
obj = {
  0: 0,
  [symbol]: 'banana',
};
obj[symbol] = 'apple';

// ループではsymbolは無視される
for (const key in obj) {
  console.log(key);
}

// symbolだけ取ってくる
Object.getOwnPropertySymbols(obj);

// 全部とってくる
Reflect.ownKeys(obj);

/*
Well-Knownシンボル
*/
let items = [0, 1, 2];

arrayLikeObj = {
  0: 6,
  1: 7,
  length: 2,
};

// concatは配列のようなオブジェクトには動かない（{}のまま展開しない）
// isArray（配列かオブジェクトか見極める方法）がfalseなら
let result = items.concat([3, 4, 5], arrayLikeObj);

/*
Symbol.isConcatSpreadable
*/
arrayLikeObj = {
  0: 6,
  1: 7,
  length: 2,
  [Symbol.isConcatSpreadable]: true,
};
// trueの場合、{}も展開して配列にする
result = items.concat([3, 4, 5], arrayLikeObj);
console.log(result);

/*
iterableObject
*/
// ① 通常のオブジェクトにプロパティを定義
iterableObject = {
  a: 'a',
  b: 'b',

  // ② Symbol.iterator メソッドを実装
  [Symbol.iterator]() {
    let count = 0;
    return {
      // ③ next() を持つイテレータを返す
      next() {
        count += 1;
        return count > 3
          ? { done: true } // 終了シグナル
          : {
              value: count,
              done: false,
            }; // 値と継続シグナル
      },
    };
  },
};
for (const item of iterableObject) {
  console.log(item); // trueになったら処理終了
  // 内部の挙動
  // console.log(iterator.next()); // { value:1, done:false }
  // console.log(iterator.next()); // { value:2, done:false }
  // console.log(iterator.next()); // { value:3, done:false }
  // console.log(iterator.next()); // { done:true }
}
let iterator = iterableObject[Symbol.iterator]();

// arrayLikeObj を Iterable にする
// これでarrayLikeObj が配列のメソッドや、Symbol.iterator を継承
// 本番では __proto__は非推奨
arrayLikeObj.__proto__ = Array.prototype;

// スプレッド構文も可能
console.log(...arrayLikeObj, 8, 9);

// 分割代入も可能
let [first, second] = arrayLikeObj;

// 配列に変更する
let realArray = Array.from(arrayLikeObj);

/*
ジェネレータ関数
*/
function* generatorFunc() {
  yield 2;
  yield 4;
  yield 6;
}
let generator = generatorFunc(); // 返り値をジェネレータ
console.log(iterator);

// Iterator.prototype;

/*
タグ付きテンプレート
*/
// テンプレートリテラル ``
const myTag = (strings, name, age) => {
  // 第1引数 strings はリテラル部分の配列
  // 内部的に strings = ["hello! I am ", " and ", " years old"]
  console.log(strings, name, age);
  return `${strings[0]}${age}${strings[2]}${strings[1]}${name}`;
};
let name = 'minori';
let age = 28;
console.log(myTag`hello! I am ${name} and ${age} years old`);
// hello! I am 28 years old and minori
