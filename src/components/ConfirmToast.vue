<!-- src/components/ConfirmToast.vue -->
<script lang="ts" setup>
const props = defineProps<{
  message: string
  onConfirm: () => void
  onCancel: () => void
}>()
</script>

<template>
  <div class="confirm-toast">
    <span class="confirm-message">{{ message }}</span>
    <div class="confirm-buttons">
      <button class="btn btn-confirm" @click="onConfirm">Sim</button>
      <button class="btn btn-cancel" @click="onCancel">Não</button>
    </div>
  </div>
</template>

<style scoped>
.confirm-toast {
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px;
}
.confirm-message {
  font-weight: 500;
  font-size: 200%;
}
.confirm-buttons {
  display: flex;
  gap: 4%;
}
.btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-confirm {
  background-color: #2ba32f;
  color: rgb(9, 228, 56);
}
.btn-cancel {
  background-color: #f44336;
  color: white;
}
</style>
