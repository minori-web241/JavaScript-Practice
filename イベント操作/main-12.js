/*
DOMイベント - onclickプロパティまたはaddEventListener
*/

// onclick
const button = document.querySelector('button');
button.onclick = () => {
  alert('clicked!');
};

button.onclick = null;

// 同じ要素の同じイベントに対して、複数の関数を対応づけることが可能
button.addEventListener('click', () => {
  console.log('clicked from addEventListener');
});
button.addEventListener('click', () => {
  console.log('clicked again! from addEventListener');
});

// removeEventListener
// 削除したい関数をそのまま第二引数に入れるのではなく、定数で定義したものを入れる！！
const clickListener = () => {
  console.log('clicked from addEventListener');
};
button.addEventListener('click', clickListener);
// 削除
button.removeEventListener('click', clickListener);

// 第三引数で{}を指定できる
// once - 一度実行されたら削除される
button.removeEventListener('click', clickListener, {
  once: true,
});
