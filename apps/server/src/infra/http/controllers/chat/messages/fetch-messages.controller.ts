import { FetchMessagesUseCase } from '@/domain/chat/application/use-cases/messages/fetch-messages-use-case'
import { Controller, Get } from '@nestjs/common'

@Controller('/wa/:instanceId/chats/:waChatId/messages')
export class FetchMessagesController {
	constructor(private fetchMessages: FetchMessagesUseCase) {}

	@Get()
	async handle() {
		const response = await this.fetchMessages.execute({})
	}
}
