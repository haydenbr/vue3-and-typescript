<template>
  <teleport to="#modal-content" v-if="isModalOpen">
    <slot/>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useModal } from './useModal'

export default defineComponent({
  name: 'ModalView',
  setup () {
    const { isModalOpen } = useModal()
    return { isModalOpen }
  }
})
</script>
