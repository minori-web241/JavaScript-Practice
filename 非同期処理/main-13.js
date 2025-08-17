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
promise = new Promise((resolve, reject) => {
  // ①内側のpromiseの処理が先に実行されてから
  let tpmPromise = new Promise((resolve2) => {
    setTimeout(() => {
      resolve2();
    }, 1000);
  });
  resolve(tpmPromise);
  // 内部的に
  // tpmPromise.then(resolve,reject)
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
thenableObj
*/
promise = new Promise((resolve, reject) => {
  let thenableObj = {
    then(resolve2, reject2) {},
  };
  resolve(thenablObj);
  // 内部的に
  // thenableObj.then(resolve,reject)
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
    [[PromiseFulfillReactions]]:[newFunc2Fulfill]
    [[PromiseRejectReactions]]:[newFunc2Reject]

    // 内部的に変形した関数を入れている
    let newFunc2Fulfill = (value) =>{
    try {
      let result = func2(value);
      resolve3(result)
    } catch(error){
      reject3(error)
    }
    let newFunc2Reject = (value) => {
      reject3(value)
    }
    let newFunc3Reject = (value) => {
      resolve4(value)
    }
  }
*/
let func2 = (value) => {
  console.log(value);
  throw new Error(3);
};

let promise3 = promise2.then(func2);
let promise4 = promise3.catch((error) => {
  console.log(error.message);
  throw new Error(4);
});
let finallyFunc = () => {};
let promise5 = promise4.finally();
let promise6 = promise5.then(() => {
  throw new Error('error');
});
let promise7 = promise6.then(() => {
  promise8.catch((error) => {
    console.log(error.message);
  });
});
/*
  promise4: {
    [[promiseState]]:'pending'
    [[PromiseFulfillReactions]]:[finallyFuncFulfill]
    [[PromiseRejectReactions]]:[finallyFuncReject]

    // 内部的に変形した関数を入れている
    let finallyFuncFulfill = (value) =>{
      try {
        let result = finallyFunc();
        new Promise((resolve) => resolve(result))
        .then(() => {
          resolve5(value)
        })
        .catch((error) => {
          reject5(error)
        })
      } catch(error){
        reject5(error)
      }
    let finallyFuncReject = (value) => {
      try {
        let result = finallyFunc();
        new Promise((resolve) => resolve(result))
        .then(() => {
          reject5(value)
        })
        .catch((newError) => {
          reject5(newError)
        })
      } catch(newError){
        reject5(newError)
      }
    }

  }
*/

/*
WebAPI - promiseを返すもの
*/
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log('error:', error.message);
  })
  .then(() => {
    return navigator.Clipboard.readText();
  })
  .then((text) => {
    console.log(text);
  })
  .catch((error) => {
    console.log('error:', error.message);
  });

/*
WebAPIをPromise化する - promiseを返さない（古い）もの
*/
let promisifiedSetTimeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
promisifiedSetTimeout(1000).then(() => {
  console.log('promisifiedSetTimeout1');
  return promisifiedSetTimeout(1000);
});
promisifiedSetTimeout(1000).then(() => {
  console.log('promisifiedSetTimeout2');
  return promisifiedSetTimeout(1000);
});
promisifiedSetTimeout(1000).then(() => {
  console.log('promisifiedSetTimeout3');
  return promisifiedSetTimeout(1000);
});

/*
PromiseのStaticメソッド - all
全部成功しないとダメなケース（複数APIから同時にデータ取得 → 全部揃ってからUIに出すなど）に使う
*/
promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(1);
  }, 2000);
});
promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});
promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 500);
});

// 返り値でpromiseを返す
// 配列の中のpromiseが実行された後に、allメソッドのpromiseが実行される
Promise.all([promise, promise2, promise3])
  .then((value) => {
    // 配列の順番通りにプロパティが入る
    console.log('Promise.all then :', value);
  })
  // 1つでもrejectすると全体がrejectになる
  .catch((error) => {
    console.log('promise.all catch:', error);
  });

/*
PromiseのStaticメソッド - allSettled
全部がsettle（成功 or 失敗）するまで待つ
失敗したものも含めて結果を確認できる挙動
*/
Promise.allSettled([promise, promise2, promise3]).then((results) => {
  console.log('Promise.allSettled results:', results);
});

/*
PromiseのStaticメソッド - race
一番最初に settled（成功 or 失敗）したものの結果だけを返す
「タイムアウト処理」でよく使う
*/
// Promise.race then: 3

/*
PromiseのStaticメソッド - any
複数のPromiseのうち、最初にfulfilledになったものを返す
*/

/*
PromiseのStaticメソッド - resolve , reject
*/
// resolve
Promise.resolve('value');
new Promise((resolve) => resolve('value'));

// reject
Promise.reject(new Error('error'));
new Promise((resolve, reject) => resolve(new Error('error')));
