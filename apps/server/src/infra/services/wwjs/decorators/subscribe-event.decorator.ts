import { SetMetadata } from '@nestjs/common'

import { WWJS_EVENT_KEY } from '../constants'
import { WWJSEvent } from '../types/wwjs-event'

export function SubscribeEvent(event: WWJSEvent) {
  return SetMetadata(WWJS_EVENT_KEY, event)
}
