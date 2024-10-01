import { Injectable, SetMetadata, applyDecorators } from '@nestjs/common'
import { SOCKET_MIDDLEWARE_KEY } from '../constants'

export function Middleware() {
  return applyDecorators(Injectable(), SetMetadata(SOCKET_MIDDLEWARE_KEY, true))
}
