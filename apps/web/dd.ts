import { fetchChatsResponseBodySchema } from '@netzap/http/chat'

fetchChatsResponseBodySchema.parse({
  data: [{}],
  pagination: {
    current: 0,
    pages: 0,
    next: 0,
    prev: 0,
  },
})
