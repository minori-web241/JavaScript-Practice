/*
配列
*/
// 配列とは、オブジェクトをつくっている
let fruits = ['apple', 'banana'];
console.log(fruits);

// オブジェクトで作成しても同様になる
let arrayLikeObj = {
  0: 'apple',
  1: 'banana',
  // length: 2,
};
console.log(arrayLikeObj);
arrayLikeObj.__proto__ = Array.prototype;

/*
配列かオブジェクトか見極める方法 = isArray
// typeofやinstanceofでは見極められない
*/
Array.isArray(fruits); // true
Array.isArray(arrayLikeObj); // false

/*
lengthプロパティ
*/
fruits = ['apple', 'banana'];
fruits[2] = 'grape'; // ['apple', 'banana', 'grape']
fruits[10] = 'orange'; // [apple', 'banana', 'grape', empty × 7, 'orange']

// deleteを使用してもlengthは変化しない
delete fruits[10]; // ['apple', 'banana', 'grape', empty × 8]
fruits['hello'] = 'hello'; // ['apple', 'banana', 'grape', empty × 8, hello: 'hello']
fruits.length = 100; // ['apple', 'banana', 'grape', empty × 97, hello: 'hello']
fruits.length = 2; // ['apple', 'banana', hello: 'hello']

/*
配列の作り方
*/
// カンマ
fruits = ['apple', , 'banana']; // emptyになりlength:3になる
for (const fruit of fruits) {
  console.log(fruit); // emptyはundefinedになる
}

for (const fruit in fruits) {
  console.log(fruit); // 0,2 enumerableがfalseのもの以外をループ
}

// 多重
fruits = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(fruits[0][0]); // 1（1行目・1列目）

//new Array,Array.of
fruits = new Array('apple', 'banana');
fruits = new Array(1, 2, 3);
fruits = new Array(5); // 数字一つの場合は、empty lengthの個数
fruits = new Array('hello'); // 文字列の場合は、'hello'
fruits = Array('apple', 'banana'); // new Array 上記と同様の挙動
fruits = Array.of(5); // new Array(5)とは違い、配列を作る 0:5,length:1

console.log(fruits);

/*
スプレッド構文
*/
fruits = new Array('apple', 'banana', 'grape');
const newFruits = [...fruits, 'orange'];
console.log(newFruits, fruits);

// レストパラメーター
let sum = (...nums) => {
  console.log(nums);
};
sum(1, 2, 3, 4); // [1, 2, 3, 4]

// ...とすることで、呼び出し式の中でも展開できる
let nums = [1, 2, 3, 4];
sum(...nums, 5); // [1, 2, 3, 4,5]

/*
分割代入
*/
let minori = ['minori', 28];
let [name, age] = minori; // minori 20

// 指定のもののみ取得するには
minori = ['minori', 28, 'woman'];
[, , gender] = minori; // woman

// 配列の中に配列や、オブジェクトも入れられる
minori = ['minori', 28, 'woman', ['jazz', 'Kyoto'], { first: 'minori', last: 'ri' }];
[, , gender, [music, travel], { first: firstName, last }] = minori;
console.log(gender, music, travel, firstName, last); // woman jazz Kyoto minori ri

// デフォルトの値を指定
minori = ['minori', 28, ,];
[, , email = 'test@com'] = minori;
console.log(email); // test@com

// ...etc 残り全部
minori = ['minori', 28, 'Tokyo', 'jazz'];
[name, age, ...etc] = minori; // minori 28 Tokyo jazz
console.log(name, age, ...etc);

// 関数のパラメーターでも同様のことが可能
const sayMinori = ([name, age, ...etc]) => {
  console.log(name, age, ...etc); // minori 28 Tokyo jazz
};
sayMinori(minori);

/*
配列を変更するメソッド
Array.prototype
*/
// .push
let items = [0, 1, 2];
items.push(3, 4); // [0, 1, 2, 3, 4]
console.log(items.push(5, 6)); // lengthを返す

// .pop
items.pop(); //   [0, 1, 2, 3, 4, 5] 6を取り除く
console.log(items.pop()); // 5 取り除いた値

// .unshift = お尻に追加する
items.unshift(-2, -1); // [-2, -1, 0, 1, 2, 3, 4] // 戻り値はlength
console.log(items);

// .shift
items.shift(); // -2を取り除く
console.log(items);

/*
配列のようなオブジェクトには使用できるのか
*/

/*
push popの場合
*/
arrayLikeObj = {
  0: 0,
  // 1: 1,
  2: 2,
  3: 3,
  // length: 3,
  length: 4, // lengthの指定がなければ自動的に0になる
};

// .push = lengthプロパティと同じプロパティに値を代入して、length+1する
Array.prototype.push.call(arrayLikeObj, 3);

// .pop = length-1のプロパティを削除している
// 内部的にはdeleteと同じだが、popはlengthの値調整、deleteはlengthが不変
Array.prototype.pop.call(arrayLikeObj);

/*
unshift shiftの場合
*/
arrayLikeObj = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,

  length: 4,
};
// 0の値がin演算子であるかを確認して、あったらその値を1に、なければdelete演算子で削除する〜をlength回繰り返す
Array.prototype.unshift.call(arrayLikeObj, -1);
console.log(arrayLikeObj);

/*
from
*/
// オブジェクトを参考に新しい配列を作る
// prototypeまで見る
// emptyはundefinedで定義される = 疎の配列ではなく蜜の配列になる
Array.from(arrayLikeObj);

/*
splice toSpliced
配列の任意の位置から要素を削除／追加／置換する
*/
items = [0, 1, 2];
// 引数を3つ指定する
// items.splice(どこから, 削除する個数,追加したいもの);
items.splice(1, 2, 3);
// 引数が一つの場合
// items.splice(◯番目から全部削除);
items.splice(0);
items.splice(0, 0, 1, 2, 3, 4, 5);
console.log(items); // [1, 2, 3, 4, 5]

// toSpliced
// spliceとの違いは、itemsを書き換えるのではなく、新たに作成する
const newItems = items.toSpliced(0, 0, 111);
console.log(newItems); // [111, 1, 2, 3, 4, 5]

/*
fill
書き換える
*/
items = [0, 1, 2, 3, 4];

// 引数1つの場合
// items.fill(全部書き換える);
items.fill(7);

// 引数2つ
// items.fill(何で,どこから);
items.fill(9, 1);

// 引数3つ
// items.fill(何で,どこから,どこまで);
items.fill(0, 0, 5);

/*
copyWithin
コピーする
*/
items = [0, 1, 2, 3, 4];

// 引数3つ
// items.copyWithin(どこに,どこから,どこまで);
items.copyWithin(0, 2, 4); //[2, 3, 2, 3, 4] 0,1は上書きされる
// 元のlengthを超えた分は削除される
items.copyWithin(3, 2, 4); //[2, 3, 2, 2, 3]

// 引数2つ
// items.copyWithin(どこに,どこから);
items.copyWithin(1, 2);

// 引数1つの場合 第二引数は内部的に0になる = 指定の場所から全部コピーする
// items.fill(どこに);
items.copyWithin(0);

/*
reverse toReversed
順番を反対に並べ替える
*/
items = [0, 1, 2, 3, 4];
items.reverse(); // 逆になる
console.log(items);

//toReversed
// reverseとの違いは、itemsを書き換えるのではなく、新たに作成する
const newItems2 = items.toReversed();
console.log(newItems2); // [111, 1, 2, 3, 4, 5]

/*
sort toSorted
順番に並べ替える
*/
// 文字列に変換し、辞書順に並び替える
items = [10, undefined, 1, 2, , , 3]; //[1, 10, 2, 3, undefined, empty × 2]
items.sort();

// 数字の順にしたい時
items.sort((a, b) => {
  console.log(a, b);
  return a - b;
  // 比較関数
  // a, b: 比較対象の配列要素
  // return < 0 → a を前に置く
  // return > 0 → b を前に置く
  // return 0   → 順序を変更しない
  // b - aは降順ソート
});
console.log(items); // [1, 2, 3, 10, undefined, empty × 2]

// toSorted
// sortとの違いは、itemsを書き換えるのではなく、新たに作成する
const newItems3 = items.toReversed();
console.log(newItems3);

/*
slice
切り取って返り値にする
*/
items = [0, 1, 2, 3, 4];
// 引数1つ
let result = items.slice(2); // [2, 3, 4]
// 引数2つ
result = items.slice(2, 4); // 2-4まで

/*
concat ※返り値のみ
配列を繋げて一つの配列として返す
*/
items = [0, 1, 2, 3, 4];
result = items.concat(5, 6);

/*
join
配列から文字列にして返す
*/
items = ['a', 'b', 'c'];
result = items.join(); // a,b,c
result = items.join(''); // abc

/*
index lastIndexOf includes
indexを返す
*/
items = ['apple', 'banana', 'grape', 'banana'];

result = items.indexOf('banana'); // 1 // bananaは二つあるが最初にヒットしたものを返す
// 第二引数で何番目から検索
result = items.indexOf('banana', 2); // 3
// 何もなければ-1
result = items.indexOf('hello'); // -1

// lastIndexOf 反対から調べる
result = items.lastIndexOf('grape'); // 2

// includes 存在するかを返す
result = items.includes('banana'); // true
// 下記と同意義
result = items.indexOf('banana') !== -1; // true

/*
map
コールバック関数をとる
*/
items = [0, 1, 2];

// 配列に順番に関数を実行していくイメージ
result = items.map((item) => {
  return item * 10;
});

// 引数を2つまで取れる
result = items.map((item, index, array) => {
  console.log(item, index, array);
  return item * 10;
});

/*
flat
入れ子上の配列を一つの配列に戻す
*/
items = [0, 1, [2]];
result = items.flat(); // [0, 1, 2]

// 階層が深い場合は、引数で指定した階層までflatできる
items = [0, 1, [2, [3, [4]]]];
result = items.flat(4);

// 疎の配列の場合は、emptyを返さず無視される
items = [0, , 1, [2]];
result = items.flat(4); //[0, 1, 2]

/*
flatMap
mapしてからflatするのを一つにまとめたもの
*/
// 階層は指定できない デフォルトの1
result = items.flatMap((item) => {
  return item * 10;
});

/*
filter
フィルタリングできる
*/
items = [0, 1, 2, 3, 4, 5, 6];
// trueなら値を返す、falseなら削除する
// 疎の配列はfalse
result = items.filter((item) => {
  return item > 3; //  [4, 5, 6]
});

/*
reduce reduceRight
箱に要素を順番に入れていって、最後に箱の中身を返す
*/
items = [0, 1, 2, 3];

// 4つ引数をとる
// previousItemは処理後に記載する引数
result = items.reduce((previousItem, item) => {
  return previousItem + item;
}, 0); // エラー回避のため
// ① 初期値（箱の中身）を 0 にセット = 一番最後の引数がpreviousItemに入る
let previousItem = 0;
// ② items[0] = 0 を取り出して、callback(0, 0) を実行
previousItem = previousItem + items[0]; // 0 + 0 = 0
// ③ items[1] = 1 を取り出して、callback(0, 1)
previousItem = previousItem + items[1]; // 0 + 1 = 1
// ④ items[2] = 2 を取り出して、callback(1, 2)
previousItem = previousItem + items[2]; // 1 + 2 = 3
// ⑤ items[3] = 3 を取り出して、callback(3, 3)
previousItem = previousItem + items[3]; // 3 + 3 = 6
// ⑥ 最終的な previousItem（箱の中身）を返す → 6
// item = 今処理している要素

// reduceRight 上記の処理を右から行う

/*
find findIndex
探す
*/
// 記載した処理のtrueが返れば処理が終わる
// 何もなければundefined
items = ['apple', 'banana', 'grape', 'banana'];
result = items.find((item) => {
  return item === 'banana';
});

// findIndex
// trueのときのindexが返る
// 何もなければ-1を返す
items = ['apple', 'banana', 'grape', 'banana'];
result = items.findIndex((item) => {
  return item === 'banana';
});

// findLast findLastIndex  反対から上記と同様の処理

/*
every
全部trueならtrueを返す
*/
items = [0, 1, 2];
// 一度でもfalseになれば即終了
result = items.every((item) => {
  return item < 5; // true
});

/*
some
一つでもtrueならtrue
*/
// 一度でもtrueになれば即終了
result = items.some((item) => {
  return item < 1; // true
});

/*
forEach
配列を変更しない、かつ値も返さない 常にundefined
関数を実行するのみ
*/
items = ['apple', 'banana', 'grape'];
result = items.forEach((item, index, array) => {
  console.log(item, index, array);
});

// for ofとの使い分け
// forEach
// 配列のすべての要素に必ず何か処理を適用したいとき
// インデックスや元配列もコールバックで参照したいとき

// for of
// 途中でループを抜けたい／飛ばしたいとき
// シンプルに「要素だけ」を順に処理したいとき

/*
at
indexの指定に-を使用可能
*/
items = ['apple', 'banana', 'grape'];
console.log(items.at(-1)); // grape

/*
with
atの機能+元の配列の書き換えではなく返り値で書き換えた配列を生成
*/
items = ['apple', 'banana', 'grape'];
const newItems4 = items.with(-1, 'orange');
console.log(newItems4); // ['apple', 'banana', 'orange']
