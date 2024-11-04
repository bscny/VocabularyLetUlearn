# 為自己的專案設計 API

決定使用 API first

## 專案外接 API

1. WordsAPI
    - 使用時機:
        - 使用者在首頁查詢時
        - 使用者在新增單字時
    - 使用方法
        - 註冊 Rapid API key (免費)
        - 使用 js 的 fetch() .then() 功能
2. ChatGPT API
    - 使用時機:
        - Local quiz, Room Exam 出題目選項
        - Ranking Exam 出題
    - 使用方法
        - 註冊 OpenAI API key (付費)
        - 使用 js 的 async() await 功能

## 專案內部 API

[內部 API 規劃](https://app.swaggerhub.com/apis/hsuanyi0401/VocabularyLetUlearn/1.0.0#/)

目前只討論到 user 和 Set
