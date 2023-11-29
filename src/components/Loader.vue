<template>
  <span class="loader" v-if="props.isLoading">
    <span class="spinner"></span>
  </span>
</template>

<script setup>
const props = defineProps(['isLoading'])

</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
