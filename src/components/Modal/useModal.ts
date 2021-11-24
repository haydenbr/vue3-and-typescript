import { InjectionKey, Ref, provide, inject, ref } from 'vue'

const isModalOpen = ref(false)

interface ModalContext {
  openModal: () => unknown
  closeModal: () => unknown
  isModalOpen: Ref<boolean>
}

export function useModal (): ModalContext {
  return {
    openModal: () => isModalOpen.value = true,
    closeModal: () => isModalOpen.value = false,
    isModalOpen
  }
}
