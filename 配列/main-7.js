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
