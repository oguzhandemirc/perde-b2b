import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, type PersistStorage } from 'zustand/middleware';

/**
 * AsyncStorage-backed storage for Zustand `persist` (cart, session metadata).
 * Not for secrets: tokens go through `secureStorage`.
 */
export function createPersistStorage<State>(): PersistStorage<State> | undefined {
  return createJSONStorage<State>(() => AsyncStorage);
}
