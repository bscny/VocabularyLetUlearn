<template>
  <div class="submitted-sets">
    <h3>The set player submitted</h3>

    <!-- Ready 按鈕 -->
    <div class="ready-button">
      <ReadyButton />
    </div>
  </div>
</template>

<script>
import ReadyButton from '@/components/room/ReadyButton.vue';

export default {
  name: 'SubmittedSets',
  components: {
    ReadyButton,
  },
};
</script>

<style scoped>
.submitted-sets {
  background-color: #e6f7ff;
  padding: 20px;
  border: 1px solid #b3d8ff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;          /* 使用 Flexbox */
  flex-direction: column; /* 垂直排列內容 */
  justify-content: space-between; /* 將內容分散，上方內容與底部按鈕分開 */
  height: 100%;           /* 填滿可用高度 */
  text-align: center;
}

/* Ready 按鈕樣式 */
.ready-button {
  margin-top: auto; /* 推動 Ready 按鈕到底部 */
}

.ready-button button {
  background-color: #ff4d4f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.ready-button button:hover {
  background-color: #d9363e;
}

</style>
