<template>
  <slot name="modal-trigger" :open-modal="openModal" />
  <teleport to="#app">
    <div class="modal" v-if="modalOpen">
      <div class="overlay" @click="closeModal()"></div>
      <div class="modal-card">
        <slot name="modal-content" />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ModalView',
  setup () {
    const modalOpen = ref(false)

    function closeModal () {
      modalOpen.value = false
    }

    function openModal () {
      modalOpen.value = true
    }

    return {
      modalOpen,
      closeModal,
      openModal
    }
  }
})
</script>
