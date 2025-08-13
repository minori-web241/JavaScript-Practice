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

console.dir(result);
