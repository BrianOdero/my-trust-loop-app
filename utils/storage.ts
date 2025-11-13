import { MMKV } from 'react-native-mmkv'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Detect if JSI is available (required for MMKV)
const isJSIAvailable = (): boolean => {
  // nativeCallSyncHook exists when JSI is enabled and remote debugging is OFF
  // __turboModuleProxy is also a common signal
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalAny = global as any
  return (
    typeof globalAny?.nativeCallSyncHook === 'function' ||
    typeof globalAny?.__turboModuleProxy !== 'undefined'
  )
}

const canUseMMKV = Platform.OS !== 'web' && isJSIAvailable()

// Lazily create MMKV instances only when safe
export const supabaseMMKV = canUseMMKV
  ? new MMKV({ id: 'supabase_storage' })
  : undefined



// Synchronous storage used by onboarding screens
// Provide a minimal sync fallback when MMKV isn't available
type OnboardingLike = {
  getString: (key: string) => string | undefined
  set: (key: string, value: string) => void
}

const inMemoryFallbackStore: Record<string, string> = {}

export const onboardingStorage: OnboardingLike = canUseMMKV
  ? new MMKV({ id: 'onboarding_storage' })
  : {
      getString: (key: string) => inMemoryFallbackStore[key],
      set: (key: string, value: string) => {
        inMemoryFallbackStore[key] = value
        // Best-effort persist asynchronously so value survives restarts
        AsyncStorage.setItem(`onboarding:${key}`, value).catch(() => {})
      },
    }

// Initialize in-memory fallback from AsyncStorage once (non-blocking)
;(async () => {
  if (!canUseMMKV) {
    try {
      const keys = ['onboarding']
      const pairs = await AsyncStorage.multiGet(keys.map(k => `onboarding:${k}`))
      for (const [k, v] of pairs) {
        if (k && v != null) {
          const plainKey = k.replace('onboarding:', '')
          inMemoryFallbackStore[plainKey] = v
        }
      }
    } catch {}
  }
})()

// Async storage adapter for Supabase auth (uses MMKV when possible, falls back to AsyncStorage)
export const MMKVStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (supabaseMMKV) {
        const value = supabaseMMKV.getString(key)
        return value ?? null
      }
      return await AsyncStorage.getItem(key)
    } catch (err) {
      console.warn('Storage getItem error', err)
      return null
    }
  },

  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (supabaseMMKV) {
        supabaseMMKV.set(key, value)
        return
      }
      await AsyncStorage.setItem(key, value)
    } catch (err) {
      console.warn('Storage setItem error', err)
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      if (supabaseMMKV) {
        supabaseMMKV.delete(key)
        return
      }
      await AsyncStorage.removeItem(key)
    } catch (err) {
      console.warn('Storage removeItem error', err)
    }
  },
}