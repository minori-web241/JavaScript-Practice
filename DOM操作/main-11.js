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

/*
DOMを変更
innerHTML / insertAdjacentHTML
*/
// getter あまり使わない
result = document.body.innerHTML; // bodyタグの子孫ノードが全て
// setter 子孫ノードを全て削除して置き換える
document.body.innerHTML = '<h1>Hello!</h1><div>I am Tom</div>';
// 特定の要素を書き換える
document.querySelector('div').innerHTML = '<h2>I am Minori</h2>';
// 追加したいとき
// insertAdjacentHTML('どこに追加するか', '')
document.querySelector('h2').insertAdjacentHTML('beforeend', '<p>new Minori</p>');

/*
XSS（Cross-Site Scripting
*/
let userInput = '初めての投稿！';
document.body.innerHTML = userInput;
userInput = '初めての投稿！<img src="" onerror="alert(`悪質な内容`)">';
// document.body.innerHTML = userInput;

/*
XSS対策 textContent
*/

// getterとして
document.body.innerHTML = '<h1>Hello!</h1><div>I am Tom</div>';
// タグを取り除く 要素ノードの場合
result = document.body.textContent; // Hello!I am Tom
// テキストノードの場合
document.body.innerHTML = '<h1>Hello!</h1><div>I am Tom</div> How Are You';
result = document.body.childNodes[2].textContent; // How Are You
result = document.body.childNodes; // How Are You
result = document.textContent; // null

// setterとして
// 要素ノードの子孫ノードを削除して上書き
document.body.textContent = 'Hello';
// タグも文字として認識される = XSSの心配がない
document.body.textContent = '<h1>Hello</h1>';

// テキストノード
document.body.innerHTML = '<h1>Hello!</h1><div>I am Tom</div> How Are You';

/*
DOMを変更
*/
document.body.innerHTML = '<div>I am Tom</div>';

// ①単体のノードを作る
let p = document.createElement('p');

// ②作ったノードを挿入する

p.textContent = 'hello';
document.querySelector('div').append(p); // append - beforeendに入る
document.querySelector('div').prepend(p); // prepend - afterbeginに入る
document.querySelector('div').before(p); // 要素の直前にp要素を挿入
document.querySelector('div').after(p); // 要素の直後にp要素を挿入

// 下記の方が簡単 XSS対策もされている
document.querySelector('div').append('This is a text.'); // 要素の直後にp要素を挿入
// こちらと同じ document.body.insertAdjacentText('beforeend', '<h2>Minori</h2>');

/*
要素を複製、削除、置き換える
*/

p = document.createElement('p');
p.textContent = 'hello';
document.body.innerHTML = '<div>I am Tom</div>';
document.querySelector('div').append(p); // こっちが消えちゃう
document.querySelector('div').prepend(p); // ノードは使い回しができない

// 複製
let p2 = p.cloneNode(true); // 子孫ノードをコピーしたいときはtrue
document.querySelector('div').prepend(p2); // falseならhelloがでない

// 削除
p.remove(); // 子孫要素も全て

// 置き換える
p2.replaceWith(document.createElement('p'), '<p>banana</p>');

/*
node操作
*/
document.body.innerHTML = '<h1>Hello!</h1><div>I am Tom<p>hi</p>yo</div>';

// nodeType
// 数字で返す
result = document.nodeType; // 9

// nodeName
// タグの名前や固定名を返す
result = document.body.nodeName; // BODY
result = document.nodeName; // #document

// tagName elementインターフェースのみ
result = document.body.tagName; // #document

// nodeValue - getter
result = document.querySelector('div').childNodes[0].nodeValue; // I am Tom
// nodeValue - setter
document.querySelector('div').childNodes[0].nodeValue = 'I am Minori'; // I am Minori
// elementノードでは
// コメント、テキストはそのまま返すが、それ以外はほぼnull
result = document.querySelector('div').childNodes[1].nodeValue; // null

// data
// コメント・テキストインターフェースに存在する
// data - getter
result = document.querySelector('div').childNodes[2].data; // yo
// data - setter
document.querySelector('div').childNodes[2].data = 'cake'; // cake

/*
属性
*/
// idをとる
result = document.body.id;
// 代入
document.body.id = 'foo';

// type
document.body.innerHTML = '<input type="text"/>';
result = document.querySelector('input').type;
document.querySelector('input').type = 'checkbox';

// class
result = document.body.className;
result = document.body.classList;

// 一覧
result = document.body.attributes;
document.body.id = '17';
document.body.attributes.id.value = '26';

// getAttribute - 取得
result = document.body.getAttribute('id'); // 26
// setAttribute - 追加・更新
document.body.setAttribute('newattr', 'newattr'); // 26
// hasAttribute - 存在チェック
result = document.body.hasAttribute('foo'); // false
// removeAttribute - 削除
document.body.removeAttribute('type');

// dataset - data-を除く
result = document.body.dataset;

console.dir(result);
