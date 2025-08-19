/*
localStorage
*/
// 同じオリジンのサイトのタブ間でデータを共有できる
// localStorageに保存する
// 指定する値は文字列のデータのみ
localStorage.setItem('name', 'John');

// 値を取得するとき
let result = localStorage.getItem('name');

// 削除するとき
localStorage.removeItem('name');

// localStorageをすべて削除
localStorage.clear();

/*
sessionStorage
*/
// localStorageとの違い：一つのタブだけで存在する（タブを消すと消える）
// localStorageと同じプロパティを持つ
sessionStorage.setItem('name', 'John');

/*
storageイベント - localStorageの変更を検知できる
*/
window.addEventListener('storage', (event) => {
  // console.log('storage event', event);
});
