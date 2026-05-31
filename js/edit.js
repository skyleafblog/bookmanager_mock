/**
 * edit.js — 書籍編集画面スクリプト（モック用）
 */

function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    alert('更新しました（モック）');
    window.location.href = 'list.html';
}

function validate() {
    var ok = true;
    var checks = [
        { id: 'title',      err: 'err-title',    group: 'group-title',    test: function(v) { return v.trim() !== ''; } },
        { id: 'author',     err: 'err-author',   group: 'group-author',   test: function(v) { return v.trim() !== ''; } },
        { id: 'categoryId', err: 'err-category', group: 'group-category', test: function(v) { return v !== ''; } },
    ];
    checks.forEach(function(c) {
        var val = document.getElementById(c.id).value;
        var hasError = !c.test(val);
        document.getElementById(c.group).classList.toggle('has-error', hasError);
        document.getElementById(c.err).style.display = hasError ? 'block' : 'none';
        if (hasError) ok = false;
    });
    return ok;
}

function showErrors() {
    ['title', 'author', 'categoryId'].forEach(function(id) {
        document.getElementById(id).value = '';
    });
    validate();
}
