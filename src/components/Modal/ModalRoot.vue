<template>
  <div class="modal" v-if="isModalOpen">
    <div class="overlay" @click="closeModal()"></div>
    <div class="modal-card">
      <div id="modal-content"></div>
    </div>
  </div>
  <slot/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useModal } from './useModal'
import { useKeydown } from '@/util'

export default defineComponent({
  name: 'ModalRoot',
  setup () {
    const { isModalOpen, closeModal } = useModal()
    useKeydown([
      { key: 'Escape', handler: closeModal }
    ])

    return { isModalOpen, closeModal }
  }
})
</script>
