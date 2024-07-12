// ランダムな値を入れるための変数を初期化
let untyped = '';
// 入力済みの文字列を入れる変数
let typed = '';
// スコアを算出する変数
let score = 0;

// HTML要素 id untypedを取得
const untypedfield = document.getElementById('untyped');

// HTML要素 id typedを取得
const typedfield = document.getElementById('typed');

// 誤タイプの時に、背景色を変更するため、divのidを取得する
const wrap = document.getElementById('wrap');

// スタートボタンのidを取得
const start = document.getElementById('start');

// 秒数を表示しているpタグのidを取得
const count = document.getElementById('count');

// 現在の文字数を表示しているpタグのidを取得
const word = document.getElementById('wordCount');

// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];


// ランダムなテキストを表示
const createText = () => {
  // 1個目に入力した内容をクリア　※2個目のテキストの内容を表示させるため
  typed = '';
  typedfield.textContent = typed;

  // textListsのインデックス番号を作成
  // '0以上1未満'のランダムな数字 × textListsの要素数　=> 小数点を切り捨て
  let random = (Math.floor(Math.random() * textLists.length));
  // 配列からランダムなテキストを取得して、画面に表示
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
  // 誤タイプの場合の処理
    // 'e'はイベントオブジェクト　'key'はイベントオブジェクトのプロパティ
    // キーボードで入力された文字が'key'に入る
    // 'return'は関数の処理を中断させる
    // キーボードで入力された文字とテキストの1文字目を比較して
    // 相違していたら、関数の実行を終了させる
  if (e.key !== untyped.substring(0, 1)) {
    // wrapの箇所に、'mistyped'というクラスを作成
    wrap.classList.add('mistyped');

    // 誤タイプ時に一瞬だけ、背景を赤くする
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);

    // 関数の処理を中断
    return;
  }

  // 正タイプの場合の処理
  // スコアの算出
  score++;
  // 文字数の算出
  word.textContent = score; 
  // untypedの先頭文字を取得し、typedの末尾に追加する
  typed += untyped.substring(0, 1);
  // untypedの先頭文字を削除する
  untyped = untyped.substring(1);
  // typedfieldにtypedの値を表示
  typedfield.textContent = typed;
  // untypedfieldにuntypedの値を表示
  untypedfield.textContent = untyped;

  // 新しいテキストを表示させる
  if (untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
  let text = '';
  // ランクの表示
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクあと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクあと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはAです。\nSランクあと${300 - score}文字です。`;
  } else if (score >= 300) {
    text = `あなたのランクはAです。\nおめでとうございます！`;
  }
  return `${score}文字打てました！\n${text}\【OK】リトライ / 【キャンセル】終了`
};

// ゲームを終了
const gameOver = id => {
  // 0秒になったら、テキスト箇所に'タイムアップ'と表示する
  setTimeout(() => {
    typed = '';
    untypedfield.textContent = 'タイムアップ！';
  }, 1000);
  clearInterval(id);
  
  setTimeout(() => {
    // ゲーム終了後にダイアログを表示
    const result = confirm(rankCheck(score));
    // ダイアログのOKボタンをクリックしたら、ブラウザをリロードする
  // confirmの'OK'ボタンを押すと、戻り値として'true'を返す
  if (result == true) {
    window.location.reload();
  }
  }, 2000);
  
};

// カウントダウンタイマー
// 1000ミリ秒（1秒）間隔で実行される
const timer = () => {
  // タイマー部分のHTML要素であるPタグの値を取得
  let time = count.textContent;

  const id = setInterval(() => {
    // 1秒ずつデクリメントする
    time--;
    // デクリメントされた秒数を画面に表示
    count.textContent = time;
    // 0秒になったら、タイマーを停止する
    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};



// ゲームスタート時の処理
start.addEventListener ('click', () => {
  // タイマー関数の呼び出し
  timer();

  // ランダムなテキストを表示する関数の呼び出し
  createText();

  // スタートボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  // キーボードが叩かれるたびにイベントが発生する
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';