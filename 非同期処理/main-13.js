/*
非同期
*/

// コールバック関数での非同期処理 - setTimeoutの例
setTimeout(() => {
  console.log('two');
  window.addEventListener('click', () => {
    console.log('wait');
  });
}, 3000);
alert('not async');
console.log('one');

// 非同期のAPIは2つのパートに分けられる - ①メインのC++、②その後にJavaScript
navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
});
console.log(1);

/*
コールバック地獄 - コードが見にくい、エラー処理が動かない
*/
window.addEventListener('click', (e) => {
  console.log(e);
  setTimeout(() => {
    console.log('setTimeout');
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setInterval(() => {
        console.log('setInterval');
      }, 1000);
    });
  }, 1000);
});

/*
try catch - 失敗時のエラー処理が分散しやすく、捕まえにくい
*/
try {
  setTimeout(() => {
    throw new Error('error'); // setTimeoutで処理が飛ばされ捕捉できない
  }, 1000); // 0の場合でも、後続の処理が優先される

  // C++エラーが起きたら対処が難しい場合がある
} catch (error) {
  console.log(error);
}

/*
promise - ECMAScriptの言語
*/
// promiseは、newするときに第一引数にコールバック関数を入れる
// ①newされた瞬間に実行される ＋ ②第一引数/第二引数に値が入る（resolve, rejectが多い）
let promise = new Promise((resolve, reject) => {
  // resolve、reject、throwのうち、最初の処理のみが適応 = 以降の変更は無視される

  // ③resolve('hello');
  // ③reject('error');

  // throw 'error';としたら、
  // 内部的に下記と同じになる
  // try {
  //   throw 'error';
  // } catch (error) {
  //   reject(error);
  // }
  console.log('new promise!');
});

/*
promise - 内部的なプロパティ
*/
// 初期状態
// [[PromiseState]]:"pending"
// [[PromiseResult]]:undefined

// ④関数オブジェクトによるプロパティの変更
// resolveは[[PromiseState]]:"fulfilled",[[PromiseResult]]:"hello"
// rejectは[[PromiseState]]:"rejected",[[PromiseResult]]:"error"

/*
promise - メソッド
*/
// PromiseStateの状態によって、それぞれの実行可否が決まる
// 第一引数にコールバック関数 - PromiseResultの結果が渡される - finallyはundefined
// これらのメソッドは、すべてのコードが実行されたあとに実行される

// ① resolveの場合
promise = new Promise((resolve) => {
  resolve('wa-i');
});

// ② rejectの場合
promise = new Promise((resolve, reject) => {
  reject(new Error('error'));
});

// then - resolveで実行
promise.then((value) => {
  console.log('then', value);
});

// catch - rejectで実行
promise.catch((error) => {
  console.log('catch', error.message);
});

// finally - どちらでも実行される
promise.finally((value) => {
  console.log('finally', value);
});

// 省略記法 - thenとcatchをまとめる
// thenの第二引数にcatchの処理を入れる
promise.then(
  (value) => {
    console.log('then fulfilled', value);
  },
  (error) => {
    console.log('then reject', error.message);
  }
);

/*
promise - pending
*/
// pendingのとき、メソッドの実行はされないが、各コールバック関数をpromiseの[[PromiseFulfillReactions]][[PromiseRejectReactions]]に追加しておく
// なぜか：pendingから、fulfilledやrejectedに変更した時に、ここに登録されていたものを一気に実行するため
// 変更方法：あとからメソッド変更できない → 非同期のAPIを利用する

promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('hello');
  }, 1000);
});

promise.then(
  (value) => {
    console.log('then fulfilled', value);
  },
  (error) => {
    console.log('then reject', error.message);
  }
);
promise.finally((value) => {
  console.log('finally', value);
});

/*
promise - promiseをresolveしたとき = 処理が連動する
*/
// ②外側の処理が実行される
promise = new Promise((resolve) => {
  // ①内側のpromiseの処理が先に実行されてから
  let tpmPromise = new Promise((resolve2) => {
    setTimeout(() => {
      resolve2();
    }, 1000);
  });
  resolve(tpmPromise);
  // 内部的に
  // tpmPromise.then.(resolve,reject)
  // resolve() or reject()
});

promise.then(
  (value) => {
    console.log('then fulfilled', value);
  },
  (error) => {
    console.log('then reject', error.message);
  }
);
promise.finally((value) => {
  console.log('finally', value);
});

/*
promiseチェーン
*/
// returnはthenを探す
// throwはcatchを探す

new Promise((resolve) => resolve(1))
  .then((value) => {
    console.log(value);
    // returnされたら、次の.thenが実行される
    return 2;
  })
  .then((value) => {
    console.log(value);
    // throwしたら次の.catchの第一引数の関数が実行される
    throw new Error(3);
  })
  .catch((error) => {
    console.log(error.message);
    throw new Error(4);
  })
  .catch((error) => {
    console.log(error.message);
    return 5;
  })
  .then((value) => {
    console.log(value);
    // returnされたら、次が.catchの場合はスキップされる
    return 6;
  })
  .catch(() => {
    console.log('skip'); // 実行されない
  })
  .catch(() => {
    console.log('skip'); // 実行されない
  })
  .then((value) => {
    console.log(value); // 6はここで受け取る
    throw new Error(7);
  })
  .then(() => {
    console.log('skip'); // 実行されない
  })
  .then(() => {
    console.log('skip'); // 実行されない
  })
  .catch((error) => {
    console.log(error.message);
    return 8;
  })
  // finallyは必ず実行される - 値は入らない
  .finally((value) => {
    console.log('finally value :', value); // finally value : undefined
  })
  .then((value) => {
    console.log(value); // 8
    return 'not used'; // 使われない
  })
  // finallyの中でthrow or rejectされると、それまでのthen探しは中断、catch探しが始まる
  .finally((value) => {
    // throw new Error(9);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(9));
      }, 1000);
    });
  })
  .then(() => {
    console.log('skip'); // 実行されない
  })
  .catch((error) => {
    console.log(error.message);
  });

/*
promiseチェーン - しくみ
*/
// 内部的にpromiseオブジェクトを新しく作成して返している
promise = new Promise((resolve) => resolve(1));
let promise2 = promise.then((value) => {
  console.log(value);
  return 2;
});
/*
  promise2: {
    [[promiseState]]:'pending'
    [[promiseState]]:[newFunc2]
  }
    let newFunc2 = (value) =>{
    try {
      let result = func2(value);
      resolve3(result)
    } catch(error){
      reject3(error)
    }
  }*/
let promise3 = promise2.then((value) => {
  console.log(value);
  throw new Error(3);
});
let promise4 = promise3.catch((error) => {
  console.log(error.message);
  throw new Error(4);
});

console.log(promise);
