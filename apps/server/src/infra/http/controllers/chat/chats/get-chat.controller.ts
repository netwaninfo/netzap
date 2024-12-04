import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GetChatUseCase } from '@/domain/chat/application/use-cases/chats/get-chat-use-case'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { ZodHttpValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { ChatPresenter } from '@/infra/presenters/chat/chat-presenter'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import {
  type GetChatRequestParams,
  type GetChatResponseBody,
  getChatRequestParamsSchema,
} from '@netzap/http/chat'

const paramsSchema = new ZodHttpValidationPipe(getChatRequestParamsSchema)

@Controller('/wa/:instanceId/chats/:waChatId')
export class GetChatController {
  constructor(private getChat: GetChatUseCase) {}

  @Get()
  async handle(
    @Param(paramsSchema) params: GetChatRequestParams
  ): Promise<GetChatResponseBody> {
    const { instanceId, waChatId } = params

    const response = await this.getChat.execute({
      instanceId: UniqueEntityID.create(instanceId),
      waChatId: WAEntityID.createFromString(waChatId),
    })

    if (response.isFailure()) {
      throw new BadRequestException()
    }

    const { chat } = response.value

    return {
      data: ChatPresenter.toOutput(chat),
    }
  }
}
