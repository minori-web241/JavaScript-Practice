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
