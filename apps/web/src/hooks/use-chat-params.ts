import { useParsedParams } from '@/hooks/use-parsed-params'
import { z } from 'zod'
import { instanceParamsSchema } from './use-instance-params'

const chatParamsSchema = instanceParamsSchema.extend({
  waChatId: z.string().transform(id => decodeURIComponent(id).toString()),
})

function useChatParams() {
  const params = useParsedParams(chatParamsSchema)

  return params
}

export { useChatParams, chatParamsSchema }
