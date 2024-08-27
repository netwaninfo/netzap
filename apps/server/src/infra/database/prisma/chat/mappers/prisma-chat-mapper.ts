import { isPrivateChat } from '@/domain/chat/enterprise/type-guards/chat'
import { Chat } from '@/domain/chat/enterprise/types/chat'
import { Prisma } from '@prisma/client'
import { PrismaGroupChatMapper, RawGroupChat } from './group/chat-mapper'
import { PrismaPrivateChatMapper, RawPrivateChat } from './private/chat-mapper'

type Raw = RawPrivateChat | RawGroupChat

export class PrismaChatMapper {
	static toDomain(raw: Raw): Chat {
		if (PrismaChatMapper.isRawPrivateChat(raw)) {
			return PrismaPrivateChatMapper.toDomain(raw)
		}

		return PrismaGroupChatMapper.toDomain(raw)
	}

	static toPrisma(chat: Chat): Prisma.ChatUncheckedCreateInput {
		if (isPrivateChat(chat)) {
			return PrismaPrivateChatMapper.toPrisma(chat)
		}

		return PrismaGroupChatMapper.toPrisma(chat)
	}

	private static isRawPrivateChat(raw: Raw): raw is RawPrivateChat {
		return raw.type === 'private'
	}
}
