import { Injectable, SetMetadata, applyDecorators } from '@nestjs/common'

import { WWJS_HANDLER_KEY } from '../constants.js'

export function Handler() {
  return applyDecorators(Injectable(), SetMetadata(WWJS_HANDLER_KEY, true))
}
