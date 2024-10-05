import { Either, failure, success } from '@/core/either'
import {
  WhatsAppService,
  WhatsAppServiceGetChatByWAChatId,
  WhatsAppServiceSendTextMessageParams,
} from '@/domain/chat/application/services/whats-app-service'
import { WAChat } from '@/domain/chat/enterprise/types/wa-chat'
import { WAMessage } from '@/domain/chat/enterprise/types/wa-message'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import { Injectable } from '@nestjs/common'
import { RequestFunction } from '../types/internals'
import { WWJSService } from '../wwjs.service'
import { WWJSChatMapper } from './mappers/wwjs-chat-mapper'

@Injectable()
export class WWJSChatService implements WhatsAppService {
  constructor(
    private wwjsService: WWJSService,
    private chatMapper: WWJSChatMapper
  ) {}

  private async wrap<T>(
    request: RequestFunction<T>
  ): Promise<Either<UnhandledError, T>> {
    try {
      return success(await request())
    } catch (error) {
      const err = error as Error
      return failure(new UnhandledError({ message: err.message }))
    }
  }

  async getChatByWAChatId({
    instanceId,
    waChatId,
  }: WhatsAppServiceGetChatByWAChatId): Promise<
    Either<UnhandledError | ServiceUnavailableError, WAChat>
  > {
    const client = this.wwjsService.getAvailableClient(instanceId)

    if (!client) {
      return failure(
        new ServiceUnavailableError({ name: WWJSChatService.name })
      )
    }

    return this.wrap(async () => {
      const chat = await client.raw.getChatById(waChatId.toString())

      return this.chatMapper.toDomain({ chat, client })
    })
  }

  async sendTextMessage({
    instanceId,
  }: WhatsAppServiceSendTextMessageParams): Promise<
    Either<UnhandledError, WAMessage>
  > {
    const client = this.wwjsService.getAvailableClient(instanceId)

    if (!client) {
      return failure(
        new ServiceUnavailableError({ name: WWJSChatService.name })
      )
    }

    throw new Error('Method not implemented.')
  }
}
