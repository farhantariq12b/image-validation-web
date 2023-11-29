<template>
  <div>
    <h1 class="title">Image Upload Form</h1>
    <form @submit.prevent="submitForm" class="form">
      <div v-if="selectedFileUrl">
        <img :src="selectedFileUrl" alt="Selected file" class="selected-image" />
      </div>

      <label for="fileInput" class="file-label">
        <span class="file-icon">📷</span> Choose Image
      </label>
      <input id="fileInput" type="file" @change="handleFileChange" accept="image/png,image/jpg,image/jpeg,image/gif"
        class="file-input" />
      <button type="submit" class="submit-button">Upload Image</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['submitForm'])
const inputFile = ref<File | undefined>()

const selectedFileUrl = computed(() => {
  return inputFile.value ? URL.createObjectURL(inputFile.value) : null
})

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  const selectedFiles = target?.files || []

  inputFile.value = selectedFiles[0]
}

const submitForm = () => {
  if (!inputFile.value) {
    alert('Please select a file to upload')
    return
  }

  emit('submitForm', inputFile.value)
}

</script>

<style scoped>
.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.file-label {
  display: inline-block;
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
}

.file-input {
  display: none;
}

.file-icon {
  margin-right: 10px;
}

.submit-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #27ae60;
}

.selected-image {
  width: 150px;
  height: 150px;
}
</style>
