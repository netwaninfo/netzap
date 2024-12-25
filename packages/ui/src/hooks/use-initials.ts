interface UseInitialsProps {
  value: string
  length?: number
}

function useInitials({ value, length = 2 }: UseInitialsProps) {
  return value
    .replace(/[-|\/]/, '')
    .split(/\s+/)
    .slice(0, length)
    .map(chunk => chunk.at(0)?.toUpperCase())
    .join('')
}

export { useInitials }
