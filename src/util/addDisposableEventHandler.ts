type addEventListenerParameters = Parameters<typeof window.addEventListener>

export function addDisposableEventHandler<EventType extends Event>(type: string, listener: (e: EventType) => void, options?: addEventListenerParameters[2]): () => unknown {
  window.addEventListener(type, listener as (e: Event) => void, options)

  return () => window.removeEventListener(type, listener as (e: Event) => void, options)
}
