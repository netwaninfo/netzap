import {
  WhatsAppService,
  WhatsAppServiceGetChatByWAChatId,
  WhatsAppServiceSendTextMessageParams,
} from '@/domain/chat/application/services/whats-app-service'
import { WAChat } from '@/domain/chat/enterprise/types/wa-chat'
import { WAMessage } from '@/domain/chat/enterprise/types/wa-message'
import { Injectable } from '@nestjs/common'
import { WWJSService } from '../wwjs.service'
import { WWJSChatMapper } from './mappers/wwjs-chat-mapper'

@Injectable()
export class WWJSChatService implements WhatsAppService {
  constructor(
    private wwjsService: WWJSService,
    private chatMapper: WWJSChatMapper
  ) {}

  async getChatByWAChatId({
    instanceId,
    waChatId,
  }: WhatsAppServiceGetChatByWAChatId): Promise<WAChat | null> {
    const client = this.wwjsService.getAvailableClient(instanceId)

    if (!client) return null
    const chat = await client.raw.getChatById(waChatId.toString())

    return this.chatMapper.toDomain({ chat, client })
  }

  async sendTextMessage(
    params: WhatsAppServiceSendTextMessageParams
  ): Promise<WAMessage> {
    throw new Error('Method not implemented.')
  }
}
