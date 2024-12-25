import { z } from 'zod'

import { useParsedParams } from '@netzap/ui/hooks/use-parsed-params'

import { instanceParamsSchema } from './use-instance-params'

const chatParamsSchema = instanceParamsSchema.extend({
  waChatId: z.string().transform(id => decodeURIComponent(id).toString()),
})

function useChatParams() {
  return useParsedParams(chatParamsSchema)
}

export { useChatParams, chatParamsSchema }
