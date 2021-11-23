import { onMounted, onUpdated } from 'vue'

export function onMountOrUpdate(hook: () => unknown) {
  onMounted(hook)
  onUpdated(hook)
}
