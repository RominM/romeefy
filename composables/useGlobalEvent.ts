type TEventName = string
type TSubscriberCallback<T = unknown> = (payload?: T) => void | boolean

class GlobalEventsManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private subscribers: Record<TEventName, Array<TSubscriberCallback<any>>> = {}
  private eventsQueue: Array<{ eventName: TEventName; payload: unknown }> = []
  private flushing = false

  public subscribeTo<T = unknown>(eventName: string, callback: TSubscriberCallback<T>): () => void {
    if (!this.subscribers[eventName]) this.subscribers[eventName] = [callback]
    else this.subscribers[eventName].push(callback)

    return () => this.unsubscribeFrom(eventName, callback)
  }

  public unsubscribeFrom<T = unknown>(eventName: string, callback: TSubscriberCallback<T>) {
    const subs = this.subscribers[eventName]
    if (!subs) return
    const idx = subs.indexOf(callback as TSubscriberCallback)
    if (idx > -1) subs.splice(idx, 1)
  }

  public async emitEvent<T = unknown>(eventName: string, payload?: T) {
    this.eventsQueue.push({ eventName, payload })
    this.flushEvents()
  }

  private async flushEvents(): Promise<void> {
    if (this.flushing) return

    this.flushing = true

    while (this.eventsQueue.length) {
      const event = this.eventsQueue.shift()

      if (event) this.dispatchEvent(event.eventName, event.payload)
    }

    this.flushing = false
  }

  private dispatchEvent<T = unknown>(eventName: string, payload: T) {
    if (!this.subscribers[eventName] || !this.subscribers[eventName].length) return
    for (const subscriber of this.subscribers[eventName]) {
      if (subscriber) {
        if (subscriber(payload)) return
      }
    }
  }
}

const globalEventsManager = new GlobalEventsManager()

export const useGlobalEvents = () => ({
  emitEvent: <T = unknown>(eventName: string, payload?: T) => {
    globalEventsManager.emitEvent<T>(eventName, payload)
  },
  subscribeTo: <T = unknown>(eventName: string, callback: TSubscriberCallback<T>) => {
    const unsubscribe = globalEventsManager.subscribeTo<T>(eventName, callback)
    // Auto-cleanup when called from a Vue component's setup context
    try {
      onUnmounted(unsubscribe)
    } catch {
      // Not in a component setup context — caller must manually call the returned unsubscribe fn
    }
    return unsubscribe
  }
})
