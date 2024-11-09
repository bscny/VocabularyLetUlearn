// public/js/main.js



// 查詢單字並顯示結果
document.getElementById('searchWordButton').addEventListener('click', () => {
    const word = document.getElementById('searchWordInput').value.trim();
    if (word) {
        fetchWordData(word);
        document.getElementById('searchWordInput').value = '';
    }
});

async function fetchWordData(word) {
    try {
        const response = await fetch(`/api/words/${word}`);
        if (response.ok) {
            const data = await response.json();
            displayWordData(data);
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayWordData(data) {
    const wordDataDiv = document.getElementById('wordData');
    wordDataDiv.innerHTML = `
        <h2>${data.word}</h2>
        <h3>中文翻譯：</h3>
        <p>${data.translation}</p>
        <h3>定義：</h3>
        <ul>${data.definitions.map(def => `<li>${def}</li>`).join('')}</ul>
        <h3>例句：</h3>
        <ul>${data.examples.map(ex => `<li>${ex}</li>`).join('')}</ul>
        <h3>同義詞：</h3>
        <p>${data.synonyms.join(', ')}</p>
        <h3>反義詞：</h3>
        <p>${data.antonyms.join(', ')}</p>
    `;
}

// 添加單字到單字集
document.getElementById('addWordButton').addEventListener('click', () => {
    const word = document.getElementById('searchWordInput').value.trim();
    if (word) {
        updateVocabSet(word);
        document.getElementById('searchWordInput').value = '';
    }
});

// 更新單字集
async function updateVocabSet(word) {
    try {
        const response = await fetch('/api/set', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ word }),
        });
        const result = await response.json();
        if (response.ok) {
            displayVocabSet();
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// 顯示單字集
async function displayVocabSet() {
    try {
        const response = await fetch('/api/set');
        if (response.ok) {
            const vocabSet = await response.json();
            const vocabSetList = document.getElementById('vocabSet');
            vocabSetList.innerHTML = '';
            vocabSet.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.word || item; // 如果使用資料庫，item 可能是物件
                // 添加刪除按鈕
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '刪除';
                deleteButton.addEventListener('click', () => deleteWord(item.word || item));
                li.appendChild(deleteButton);
                vocabSetList.appendChild(li);
            });
        } else {
            console.error('Failed to fetch vocab set');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// 刪除單字
async function deleteWord(word) {
    try {
        const response = await fetch(`/api/set/${word}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        if (response.ok) {
            displayVocabSet();
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// 網頁載入時顯示單字集
displayVocabSet();
