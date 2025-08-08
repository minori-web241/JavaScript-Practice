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
