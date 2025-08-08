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
