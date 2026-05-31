/**
 * list.js — 書籍一覧画面スクリプト（モック用）
 */

function daysAgo(n) {
    var d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
}

const books = [
    { id: 1, title: 'Javaプログラミング入門',          author: '山田 太郎',   category: 'プログラミング', registeredAt: '2025-10-15' },
    { id: 2, title: 'Spring Boot実践ガイド',           author: '鈴木 花子',   category: 'プログラミング', registeredAt: '2025-11-20' },
    { id: 3, title: 'SQLマスター完全版',               author: '田中 一郎',   category: 'データベース',   registeredAt: '2025-12-10' },
    { id: 4, title: 'MySQL徹底入門',                   author: '佐藤 美咲',   category: 'データベース',   registeredAt: '2026-01-05' },
    { id: 5, title: 'TCP/IPネットワーク基礎',          author: '伊藤 健二',   category: 'ネットワーク',   registeredAt: daysAgo(3) },
    { id: 6, title: 'Webアプリケーションセキュリティ', author: '渡辺 悠太',   category: 'セキュリティ',   registeredAt: daysAgo(1) },
    { id: 7, title: 'アジャイル開発の実践',            author: '中村 さくら', category: 'マネジメント',   registeredAt: daysAgo(5) },
];

let isAdmin = true;

function formatDate(iso) {
    var parts = iso.split('-');
    return parts[0] + '/' + parts[1] + '/' + parts[2];
}

function isNew(iso) {
    var registered = new Date(iso);
    var sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return registered > sevenDaysAgo;
}

function switchRole(role) {
    isAdmin = (role === 'admin');
    document.getElementById('header-user').textContent = isAdmin ? '管理者 さん' : '一般ユーザー さん';
    document.getElementById('btn-new').style.display = isAdmin ? '' : 'none';
    document.getElementById('th-action').style.display = isAdmin ? '' : 'none';
    renderBooks(books);
}

function renderBooks(data) {
    const tbody = document.getElementById('book-tbody');
    const empty = document.getElementById('empty-msg');
    const table = document.getElementById('book-table');
    document.getElementById('result-count').textContent = data.length;

    if (data.length === 0) {
        table.style.display = 'none';
        empty.style.display = 'block';
        return;
    }
    table.style.display = '';
    empty.style.display = 'none';

    tbody.innerHTML = data.map(function(b) {
        var newBadge = isNew(b.registeredAt) ? '<span class="badge-new">NEW</span>' : '';
        var adminBtns = isAdmin
            ? '<a href="edit.html" class="btn btn-sm">編集</a>'
              + '<button class="btn btn-sm" onclick="deleteBook(' + b.id + ')">削除</button>'
            : '';
        var actionCell = isAdmin
            ? '<td class="action-cell">' + adminBtns + '</td>'
            : '';
        return '<tr>'
            + '<td>' + b.id + '</td>'
            + '<td>' + b.title + newBadge + '</td>'
            + '<td>' + b.author + '</td>'
            + '<td>' + b.category + '</td>'
            + '<td class="date-cell">' + formatDate(b.registeredAt) + '</td>'
            + actionCell
            + '</tr>';
    }).join('');
}

function filterBooks() {
    var title    = document.getElementById('searchTitle').value.toLowerCase();
    var category = document.getElementById('searchCategory').value;
    var filtered = books.filter(function(b) {
        return (!title    || b.title.toLowerCase().indexOf(title) !== -1)
            && (!category || b.category === category);
    });
    renderBooks(filtered);
}

function clearSearch() {
    document.getElementById('searchTitle').value = '';
    document.getElementById('searchCategory').value = '';
    renderBooks(books);
}

function deleteBook(id) {
    if (confirm('本当に削除しますか？この操作は元に戻せません。')) {
        alert('書籍ID:' + id + ' を削除しました（モック）');
    }
}

// 初期表示
document.getElementById('th-action').style.display = isAdmin ? '' : 'none';
renderBooks(books);
