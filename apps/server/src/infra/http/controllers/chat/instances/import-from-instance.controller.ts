import { Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common'
import {
  type ImportFromInstanceParams,
  importFromInstanceParamsSchema,
} from '@netzap/http/chat'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ImportFromInstanceUseCase } from '@/domain/chat/application/use-cases/instances/import-from-instance-use-case'
import { ZodHttpValidationPipe } from '@/infra/http/pipes/zod-http-validation.pipe'

const paramsSchema = new ZodHttpValidationPipe(importFromInstanceParamsSchema)

@Controller('/wa/instances/:instanceId/import')
export class ImportFromInstanceController {
  constructor(private importFromInstance: ImportFromInstanceUseCase) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Param(paramsSchema) params: ImportFromInstanceParams
  ): Promise<void> {
    const { instanceId } = params

    await this.importFromInstance.execute({
      instanceId: UniqueEntityID.create(instanceId),
    })
  }
}
