import { onBeforeUnmount } from 'vue'
import { addDisposableEventHandler } from '@/util'

interface KeydownHandler {
  key: string,
  handler: (event?: KeyboardEvent) => unknown
}

export function useKeydown(keydownHandlers: KeydownHandler[]) {
  const handlerDisposers = keydownHandlers.map(k => addDisposableEventHandler('keydown', (event: KeyboardEvent) => {
    if (event.key === k.key) {
      k.handler(event)
    }
  }))

  onBeforeUnmount(() => handlerDisposers.forEach(d => d()))
}
