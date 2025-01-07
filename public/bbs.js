"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');

// 投稿の送信処理
let count = 1; // 番号の初期値

document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value.trim();
    const quote = document.querySelector('#quote').value.trim(); // レス番号を取得
    const message = document.querySelector('#message').value.trim();
    const timestamp = new Date().toLocaleString(); // タイムスタンプを取得

    // 入力値のバリデーション
    if (!name || !message) {
        alert("名前とメッセージを入力してください");
        return;
    }

    const params = {
        method: "POST",
        body: new URLSearchParams({
            name: name,
            quote: quote || "", // 空のレス番号を許可
            message: message,
            timestamp: timestamp
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/post";
    fetch(url, params)
        .then(response => {
            if (!response.ok) throw new Error('投稿エラー');
            return response.json();
        })
        .then(response => {
            console.log("投稿成功:", response);
            document.querySelector('#message').value = ""; // メッセージをクリア
        })
        .catch(err => {
            console.error(err);
            alert("投稿に失敗しました");
        });
});

// 投稿のチェック処理
document.querySelector('#check').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch(url, params)
        .then(response => {
            if (!response.ok) throw new Error('チェックエラー');
            return response.json();
        })
        .then(response => {
            let value = Number(response.number);
            console.log("投稿数:", value);

            if (number != value) {
                const params = {
                    method: "POST",
                    body: new URLSearchParams({ start: number }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                const url = "/read";
                fetch(url, params)
                    .then(response => {
                        if (!response.ok) throw new Error('読み込みエラー');
                        return response.json();
                    })
                    .then(response => {
                        number += response.messages.length;
                        for (let mes of response.messages) {
                            console.log("新規投稿:", mes);
                            let cover = document.createElement('div');
                            cover.className = 'cover';

                            // 番号の追加
                            let number_area = document.createElement('span');
                            number_area.className = 'number';
                            number_area.innerText = count + ". "; // 番号をつける
                            count++;

                            let name_area = document.createElement('span');
                            name_area.className = 'name';
                            name_area.innerText = mes.name;

                            // 引用番号の追加
                            let quote_area = document.createElement('span');
                            quote_area.className = 'quote';
                            quote_area.innerText = mes.quote ? `[<<: ${mes.quote}] ` : ""; // 引用番号を表示

                            let mes_area = document.createElement('span');
                            mes_area.className = 'mes';
                            mes_area.innerText = mes.message;

                            let time_area = document.createElement('span');
                            time_area.className = 'time';
                            time_area.innerText = `(${mes.timestamp})`; // タイムスタンプを表示

                            cover.appendChild(number_area); // 番号追加
                            cover.appendChild(name_area);
                            cover.appendChild(quote_area); // 引用番号を追加
                            cover.appendChild(mes_area);
                            cover.appendChild(time_area); // タイムスタンプを追加

                            bbs.appendChild(cover);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        alert("投稿の読み込みに失敗しました");
                    });
            }
        })
        .catch(err => {
            console.error(err);
            alert("投稿チェックに失敗しました");
        });
});

