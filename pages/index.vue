
<template>
  <div class="container" v-show="!isLoading">
    <ImageUploader
      v-if="stepper === STEPPER_DETAILS.UPLOAD_IMAGE"
      @submitForm="uploadImage"
    />
    <FormRenderer
      v-if="stepper === STEPPER_DETAILS.VALIDATE_INPUT"
      :fields="fields"
      :errors="validationErrors"
      @submitForm="validateInput"
    />
  </div>

  <div v-if="isLoading">
    <Loader :isLoading="isLoading" />
  </div>
</template>

<script setup lang="ts">
import UserService from '~/services/plugins/User'
import Loader from '../src/components/Loader.vue'
import type { ValidationErrorType } from '../src/interfaces'
import ImageUploader from '../src/components/ImageUploader/index.vue'
import FormRenderer from '../src/components/FormRenderer/index.vue'
import { STEPPER_DETAILS } from '../src/constants'

const isLoading = ref<boolean>(false)
const fields = ref<string[]>([])
const stepper = ref<number>(1)
const validationErrors = ref<ValidationErrorType[]>([])

const uploadImage = async (file: File) => {

  isLoading.value = true

  const formData = new FormData()

  formData.append('file', file)

  try {
    const { data } = await UserService.uploadImage(formData)
    isLoading.value = false

    if (!data.content) {
      alert("Image doesn't cotain any input field")
      return
    }

    stepper.value = STEPPER_DETAILS.VALIDATE_INPUT
    fields.value = data.content
  } catch (error) {
    isLoading.value = false

    // @ts-ignore
    if (error?.response?.data) {
      // @ts-ignore
      alert(error?.response?.data?.message)
      return
    }

    console.log('Something went wrong while processing content', error)
    alert(error)
    throw error
  }

}

const validateInput = async (formData: any) => {

  isLoading.value = true

  try {
    await UserService.validateInput(formData)
    isLoading.value = false

    alert('Content validated successfully.')

    validationErrors.value = []

    stepper.value = STEPPER_DETAILS.UPLOAD_IMAGE
  } catch (error) {
    isLoading.value = false

    // @ts-ignore
    if (error?.response?.data) {
      // @ts-ignore
      validationErrors.value = error?.response?.data?.errors
      return
    }

    console.log('Something went wrong while processing content', error)
    alert(`Something went wrong while processing content:: ` + error)
    throw error
  }

}
</script>

<style>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
</style>