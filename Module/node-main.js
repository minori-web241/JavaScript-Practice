// function (exports,require,module,__filename,__dirname) {
// a = 'a';
// await 1;
let hello = 'hello';

console.log(__filename); // 文字列でファイル存在の場所を返す
// moduleで同様に取得する場合
// console.log(new URL(import.meta.url).pathname);

console.log(__dirname); // 文字列でディレクトリを返す
// moduleで同様に取得する場合
// console.log(new URL('.', import.meta.url).pathname);

// }

// requireは同期的に実行する
const A = require('./node-A.js');
console.log(A);
