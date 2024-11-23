interface GetInitialsParams {
  value: string
  length?: number
}

export function getInitials({ value, length = 2 }: GetInitialsParams) {
  return value
    .split(' ')
    .slice(0, length)
    .map(chunk => chunk.at(0)?.toUpperCase())
    .join('')
}
