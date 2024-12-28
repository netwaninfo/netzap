import { SetMetadata } from '@nestjs/common'

import { WWJS_EVENT_KEY } from '../constants.js'
import type { WWJSEvent } from '../types/wwjs-event.js'

export function SubscribeEvent(event: WWJSEvent) {
  return SetMetadata(WWJS_EVENT_KEY, event)
}
