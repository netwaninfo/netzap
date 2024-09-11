export function each(length = 5) {
  return Array.from(Array(length)).map((_, i) => i + 1)
}
