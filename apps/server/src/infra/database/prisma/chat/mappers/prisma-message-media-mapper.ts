import { MessageMedia } from '@/domain/chat/enterprise/entities/message-media'
import { MimeType } from '@/domain/chat/enterprise/entities/value-objects/mime-type'
import { Prisma, MessageMedia as PrismaMessageMedia } from '@prisma/client'

type Raw = PrismaMessageMedia

export class PrismaMessageMediaMapper {
	static toDomain(raw: Raw): MessageMedia {
		return MessageMedia.create({
			key: raw.key,
			mimeType: MimeType.create(raw.mimeType),
			url: raw.url,
		})
	}

	static toPrisma(media: MessageMedia): Prisma.MessageMediaCreateInput {
		return {
			key: media.key,
			mimeType: media.mimeType.extension(),
			url: media.url,
		}
	}
}
