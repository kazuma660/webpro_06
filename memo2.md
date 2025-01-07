let bbs = [];
let count = 1; // 番号の初期値

document.getElementById("post").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    if (!name || !message) {
        alert("名前とメッセージを入力してください");
        return;
    }

    // 新しい投稿データを追加
    bbs.push({ number: count, name: name, message: message });
    count++; // 番号をインクリメント

    displayMessages();
});

function displayMessages() {
    const bbsDiv = document.getElementById("bbs");
    bbsDiv.innerHTML = ""; // 一旦すべて削除して再表示

    bbs.forEach((data) => {
        const div = document.createElement("div");
        div.classList.add("cover");

        const number = document.createElement("span");
        number.classList.add("number");
        number.textContent = data.number + ". "; // 番号を表示

        const name = document.createElement("span");
        name.classList.add("name");
        name.textContent = data.name;

        const mes = document.createElement("span");
        mes.classList.add("mes");
        mes.textContent = data.message;

        div.appendChild(number); // 番号を追加
        div.appendChild(name);
        div.appendChild(mes);

        bbsDiv.appendChild(div);
    });
}
