import { ArgumentsHost, Catch } from '@nestjs/common'
import { BaseWsExceptionFilter } from '@nestjs/websockets'
import { type Socket } from 'socket.io'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

@Catch()
export class SocketExceptionsFilter extends BaseWsExceptionFilter {
  override catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs()
    const socket = ctx.getClient() as Socket

    if (exception instanceof ZodError) {
      return socket.emit('error', {
        message: 'Validation failed',
        errors: fromZodError(exception),
      })
    }

    super.catch(exception, host)
  }
}
