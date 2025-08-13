/*
html要素、head要素、body要素を取得する方法
*/
let result = document.documentElement;
result = document.head;
result = document.body;

/*
親子間の全てのノード
*/

// documentノードの直下の全ての子ノード
result = document.childNodes; // NodeList(2) [ <!DOCTYPE html>, <html lang="en"> ]

// <body>直下の全ての子ノード
result = document.body.childNodes; //  [ #text, <h1>,]など

// <body>最初の子ノード（ここでは#text）に対する子ノード
result = document.body.childNodes[0].childNodes; // // NodeList []（#textノードなので子はなし）

// <body>最初の子ノード（#text）が子を持つかどうか
result = document.body.childNodes[0].hasChildNodes; // false

// <body>の最初の子ノード（基本的にはtextノード）
result = document.body.firstChild; // #text（<body>開始直後の改行や空白）

// <head>の次の兄弟ノード
result = document.head.nextSibling.nextSibling; // <body>

// <body>の前の兄弟の前の兄弟
result = document.body.previousSibling.previousSibling; // <head>

/*
親子間の要素のノード
*/
// 子要素を持つことができるノードは、要素ノードかdocumentノードか
// <body>直下の子要素ノードだけ（テキストノードは除く）
result = document.body.children;

// <body>直下の最初の子要素ノード
result = document.body.firstElementChild; // <h1>
// <body>直下の最後の子要素ノード
result = document.body.lastElementChild;

// <body>の親要素
result = document.body.parentElement; // <html>

// HTML要素の親ノードは要素ノードではなくdocumentノード
result = document.documentElement.parentElement; // null
// <head>の次の兄弟要素
result = document.head.nextElementSibling; // <body>
// <body>の前の兄弟要素
result = document.body.previousElementSibling; // <head>

/*
特定の要素を取得 - 1
*/
// querySelector
// 該当の最初の要素だけを返す
result = document.querySelector('#title');
// querySelectorはElementインターフェースにもついているので、下記でも可能
result = document.body.querySelector('#title');

// 該当の要素全て
// ノードリストインターフェースとして返す
result = document.querySelectorAll('p');

// closest
// 祖先ノードor自分から最も近いもの
result = document.body.closest('html');

// matches
// 指定されたCSSセレクタの条件にマッチするか
// Elementインターフェースのみ
result = document.body.matches('body'); // true

// contains
// 中に特定のノードを含んでいるか
// nodeインターフェースのみ
result = document.body.contains(document.body); // true

/*
特定の要素を取得 - 2
querySelectorとquerySelectorAllで代替できる
*/

// getElement
// ID属性が一致する要素を1つ取得する
result = document.getElementById('title');

// getElementsByName
// name属性が一致する要素をすべて取得する
result = document.getElementsByName('good');

// getElementsByTagName
// 指定したタグ名の要素をすべて取得する
result = document.getElementsByTagName('p'); // HTMLCollectionで返る

// getElementsByClassName
// 指定したクラス名を持つ要素をすべて取得する
result = document.getElementsByClassName('apple'); // HTMLCollectionで返る

// ページ内のすべての<a>要素（href属性を持つもの）を取得
result = document.links; // HTMLCollectionで返る

// ページ内のすべての<form>要素を取得する
result = document.forms; // HTMLCollectionで返る

// ページ内のすべての<img>要素を取得する
result = document.images; // HTMLCollectionで返る

// ページ内のすべての<script>要素を取得する
result = document.scripts; // HTMLCollectionで返る

console.dir(result);
