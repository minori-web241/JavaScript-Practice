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

/*
event
*/
// イベントオブジェクトを返す - イベントの種類によって参考するインターフェースが変わる
// eventは、ブラウザが「クリックされた瞬間」に自動で作って渡してくれる特別なオブジェクト
// その中には「イベントの種類に応じた情報」が全部入っている
button.addEventListener('click', (event) => {
  console.log(event);
});

/*
this
*/
// thisはイベントハンドラが登録されている要素を指し示す
button.addEventListener('click', function (event) {
  console.log(this); // <button>
});

button.onclick = function (event) {
  console.log(this);
};

button.addEventListener(
  'click',
  function (a, b, event) {
    console.log(this, a, b, event); // <button>
  }.bind({}, 'a', 'b')
);

/*
バブリング
*/
// input イベントが発生したときに、バブリング（親要素へ伝わる）
const input = document.querySelector('input');
input.addEventListener('input', () => {
  console.log('input from input');
});
document.body.addEventListener('input', () => {
  console.log('input from body');
});
document.addEventListener('input', () => {
  console.log('input from document');
});
window.addEventListener('input', () => {
  console.log('input from window');
});

// eventオブジェクトにはtargetプロパティがある
// eventの起点がわかる
window.addEventListener('input', (event) => {
  console.log('input from window', event); // target:body
});

//
input.addEventListener('focus', (event) => {
  console.log('focus from input', event.bubbles); // false
});

/*
キャプチャリング
*/
// バブリング
const input2 = document.querySelector('input');
input2.addEventListener('input', () => {
  console.log('input from input');
});
document.body.addEventListener('input', () => {
  console.log('input from body');
});
document.addEventListener('input', () => {
  console.log('input from document');
});
window.addEventListener('input', () => {
  console.log('input from window');
});

// キャプチャリング
// デフォルトでは無効 有効にするには { capture: true }を設定する
// removeしたい時も、第三引数に同じように { capture: true }を設定する
input2.addEventListener(
  'input',
  () => {
    console.log('input from input in the capture');
  },
  { capture: true }
);
document.body.addEventListener(
  'input',
  () => {
    console.log('input from body in the capture');
  },
  { capture: true }
);
document.addEventListener(
  'input',
  () => {
    console.log('input from document in the capture');
  },
  { capture: true }
);
window.addEventListener(
  'input',
  () => {
    console.log('input from window in the capture');
  },
  { capture: true }
);

/*
キャプチャリングやバブリングを止める
*/
// 親要素への伝播だけを止める 同じ要素の他のリスナーは実行される
// event.stopPropagation();
// 	親要素への伝播＋同じ要素に登録されている後続のリスナーも実行されない
// event.stopImmediatePropagation();

/*
preventDefault - ブラウザのデフォルトの挙動を止める
*/
const aEL = document.querySelector('a');
aEL.addEventListener('click', (event) => {
  // cancelable - キャンセルの可否
  console.log(event.cancelable); // true
  event.preventDefault();
});

/*
passive
画面のスクロール
*/
// このイベントリスナーは preventDefault() を絶対に呼ばない」とブラウザに約束するための設定
// preventDefault() はしないよ」と宣言 → ブラウザが待たずに即スクロール処理できる
document.documentElement.style.height = '1500px';
window.addEventListener(
  'wheel',
  (event) => {
    console.log(event);
  },
  { passive: true }
);

/*
独自のイベント
*/
// Event
// バブリングはしない = bubblesがfalseになっている → trueにすればok
document.addEventListener('my-event', (event) => {
  console.log(event);
});
// イベントを作成
const newEvent = new Event('my-event', {
  bubbles: true, // デフォルトはfalse
  cancelable: true, // preventDefaultできるようにする
});
// イベントを発火
document.dispatchEvent(newEvent);

// CustomEvent - カスタムデータを渡す場合
const customEvent = new CustomEvent('my-event', {
  detail: { userId: 123, status: 'ok' }, // 任意のデータ
  bubbles: true,
});
// リスナーで detail を取得
document.addEventListener('my-event', (e) => {
  console.log(e.detail); // { userId: 123, status: 'ok' }
});
// 発火
document.dispatchEvent(customEvent);

/*
defer属性
*/
// DOMの構築を進めながら、jsファイルのダウンロードをする
// jsの実行はDOM構築の完了を待つ

/*
async
*/
// ダウンロードが完了したらDOM構築の途中でも即時実行
// 使用場面：広告タグや分析ツールなど、ページ表示とは独立して動かすコード
