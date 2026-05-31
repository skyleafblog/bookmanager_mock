/**
 * login.js — ログイン画面スクリプト（モック用）
 *
 * 担当処理:
 * - ボタン活性制御（updateButtons）
 * - ログイン・登録ハンドラ
 * - エラーポップアップ表示（showError）
 * - モックナビゲーター用のフォーム入力補助
 */

/**
 * ボタン活性状態を更新する。
 * - ログインボタン: ユーザ名・パスワードが両方入力済み かつ ユーザIDが未入力の場合に活性
 * - 登録ボタン: ユーザ名・ユーザID・パスワードがすべて入力済みの場合に活性
 */
function updateButtons() {
    var username = document.getElementById('username').value;
    var userId   = document.getElementById('userId').value;
    var password = document.getElementById('password').value;

    document.getElementById('loginBtn').disabled    = !(username && password) || !!(username && userId && password);
    document.getElementById('registerBtn').disabled = !(username && userId && password);
}

/** ログインフォームの送信を処理する（モック: 一覧画面へ遷移） */
function handleLogin(e) {
    e.preventDefault();
    hideError();
    window.location.href = 'list.html';
}

/** 登録ボタンの処理（モック: アラート後に一覧画面へ遷移） */
function handleRegister() {
    hideError();
    alert('登録しました（モック）');
    window.location.href = 'list.html';
}

/** 認証エラーメッセージを表示する */
function showError() {
    document.getElementById('error-msg').style.display = 'block';
}

/** エラーメッセージを非表示にする */
function hideError() {
    document.getElementById('error-msg').style.display = 'none';
}

/** 管理者の認証情報をフォームに入力する（モックナビゲーター用） */
function setAdmin() {
    document.getElementById('username').value = '管理者';
    document.getElementById('userId').value   = 'admin';
    document.getElementById('password').value = 'admin123';
    hideError();
    updateButtons();
}

/** 一般ユーザーの認証情報をフォームに入力する（モックナビゲーター用） */
function setGeneral() {
    document.getElementById('username').value = '一般ユーザー';
    document.getElementById('userId').value   = 'user1';
    document.getElementById('password').value = 'user123';
    hideError();
    updateButtons();
}
