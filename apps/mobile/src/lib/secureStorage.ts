import * as SecureStore from 'expo-secure-store';

// Keys are a closed list so a typo cannot silently read an empty slot.
export type SecureStorageKey = 'authToken';

export async function getSecureItem(key: SecureStorageKey): Promise<string | undefined> {
  const value = await SecureStore.getItemAsync(key);
  return value ?? undefined;
}

export async function setSecureItem(key: SecureStorageKey, value: string): Promise<void> {
  await SecureStore.setItemAsync(key, value);
}

export async function deleteSecureItem(key: SecureStorageKey): Promise<void> {
  await SecureStore.deleteItemAsync(key);
}
