const KEY = "savvytech:list-items";
export function loadItems<T>(fallback: T): T {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function saveItems<T>(value: T) {
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    //
  }
}
