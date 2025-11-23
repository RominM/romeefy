import { ref, watch } from 'vue'

export function useLocalStorage<T = any>() {
  const get = (key: string, defaultValue?: T): T | null => {
    const stored = localStorage.getItem(key)
    if (stored) {
      try {
        return JSON.parse(stored) as T
      } catch {
        return defaultValue ?? null
      }
    }
    return defaultValue ?? null
  }

  const set = (key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const remove = (key: string) => {
    localStorage.removeItem(key)
  }

  const use = (key: string, defaultValue?: T) => {
    const data = ref<T | null>(get(key, defaultValue))
    watch(data, (val) => {
      if (val === null || val === undefined) remove(key)
      else set(key, val)
    }, { deep: true })
    return data
  }

  return { get, set, remove, use }
}
