import { type PipeTransform } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { ZodError, type ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodWebSocketValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (error) {
      if (error instanceof ZodError) {
        throw new WsException({
          message: 'Validation failed',
          statusCode: 400,
          errors: fromZodError(error),
        })
      }

      throw new WsException('Validation failed')
    }
  }
}
