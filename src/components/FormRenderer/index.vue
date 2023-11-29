
<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="custom-form">
      <div v-for="(field, index) in formFields" :key="index" class="form-field">
        <!-- Split the field string into name and type -->
        <template v-if="field.includes('-')">
          <div v-if="getFieldType(field) === 'text'" class="input-group">
            <label :for="getFieldName(field)" class="label">{{ getLabel(field) }}</label>
            <input :type="getFieldType(field)" :name="getFieldName(field)" v-model="formData[getFieldName(field)]"
              class="input" />
            <div v-if="hasError(field)" class="error-message">{{ getErrorMessage(field) }}</div>
          </div>

          <div v-else-if="getFieldType(field) === 'password'" class="input-group">
            <label :for="getFieldName(field)" class="label">{{ getLabel(field) }}</label>
            <input :type="getFieldType(field)" :name="getFieldName(field)" v-model="formData[getFieldName(field)]"
              class="input" />
            <div v-if="hasError(field)" class="error-message">{{ getErrorMessage(field) }}</div>
          </div>

          <div v-else-if="isFieldType('radio', field)" class="input-group">
            <label class="label">{{ getLabel(field) }}</label>
            <div v-for="option in getRadioOptions(field)" :key="option" class="radio-option">
              <input type="radio" :name="getFieldName(field)" :value="option" v-model="formData[getFieldName(field)]" />
              <span>{{ option }}</span>
            </div>
            <div v-if="hasError(field)" class="error-message">{{ getErrorMessage(field) }}</div>
          </div>

          <div v-else-if="isFieldType('select', field)" class="input-group">
            <label :for="getFieldName(field)" class="label">{{ getLabel(field) }}</label>
            <select :name="getFieldName(field)" v-model="formData[getFieldName(field)]" class="select">
              <option v-for="option in getSelectOptions(field)" :key="option" :value="option">{{ option }}</option>
            </select>
            <div v-if="hasError(field)" class="error-message">{{ getErrorMessage(field) }}</div>
          </div>
        </template>
      </div>
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['submitForm'])
const props = defineProps(['fields', 'errors'])

const errors = ref(props.errors)

const formFields = props.fields.length ? props.fields : [];

const content = formFields.map((field) => {
  return field.split('-')[0].toLowerCase()
}).reduce((a, v) => ({ ...a, [v]: '' }), {})


const formData = ref(content);

const getFieldName = (field) => field.split('-')[0].toLowerCase();
const getFieldType = (field) => field.split('-')[1].toLowerCase();
const getLabel = (field) => field.split('-')[0];
const hasError = (field) => errors.value && errors.value.some(error => error.field === getFieldName(field));
const getErrorMessage = (field) => {
  const error = errors.value.find(error => error.field === getFieldName(field));
  let message = error?.message || '';

  if (error.args) {
    const key = Object.keys(error.args)[0]
    message += ` of ${error.args[key]}`
  }

  return message;
};

const isFieldType = (type, field) => getFieldType(field).includes(type);

const getRadioOptions = (field) => {
  const optionsString = field.split('[')[1].split(']')[0];
  return optionsString.split(',').map(option => option.trim());
};

const getSelectOptions = (field) => getRadioOptions(field);


watch(() => props.errors, (newValue) => {
  errors.value = newValue
});

const submitForm = () => {
  emit('submitForm', formData.value)
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: auto;
}

.form-field {
  margin-bottom: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.label {
  margin-bottom: 5px;
  font-weight: bold;
}

.error-message {
  font-size: 12px;
  color: red;
}

.input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.submit-button {
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #2980b9;
}
</style>
