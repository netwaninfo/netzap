import { UsersRepositories } from '@/domain/auth/application/repositories/users-repositories'
import { Injectable } from '@nestjs/common'
import { PrismaMessage } from './types/prisma-message'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/auth/enterprise/entities/user'
import { RawGroupMessage } from './mappers/group/message-mapper'
import { RawPrivateMessage } from './mappers/private/message-mapper'

interface GetRawMessageFromPrismaMessageAndUsersParams {
	message: PrismaMessage
	users: User[]
}

type RawMessage = RawPrivateMessage | RawGroupMessage

@Injectable()
export class PrismaChatMessageService {
	constructor(private usersRepository: UsersRepositories) {}

	private formatUsersIds(usersIds: (string | undefined)[]): UniqueEntityID[] {
		return Array.from(new Set(usersIds))
			.filter((id): id is string => !!id)
			.map(UniqueEntityID.create)
	}

	private getRawMessageFromPrismaMessageAndUsers({
		message,
		users,
	}: GetRawMessageFromPrismaMessageAndUsersParams): RawMessage {
		const {
			sentBy: rawSentBy,
			revokedBy: rawRevokedBy,
			quoted,
			...raw
		} = message

		const sentBy = users.find(
			(user) =>
				message.senderId &&
				user.internalId.equals(UniqueEntityID.create(message.senderId)),
		)

		const revokedBy = users.find(
			(user) =>
				message.revokerId &&
				user.internalId.equals(UniqueEntityID.create(message.revokerId)),
		)

		const rawQuoted =
			quoted &&
			this.getRawMessageFromPrismaMessageAndUsers({
				message: { ...quoted, quoted: null },
				users,
			})

		return {
			...raw,
			quoted: rawQuoted,
			sentBy:
				rawSentBy && sentBy
					? {
							...rawSentBy,
							email: sentBy.email,
							name: sentBy.name,
						}
					: null,
			revokedBy:
				rawRevokedBy && revokedBy
					? {
							...rawRevokedBy,
							email: revokedBy.email,
							name: revokedBy.name,
						}
					: null,
		}
	}

	async getRawMessage(message: PrismaMessage): Promise<RawMessage> {
		const { sentBy, revokedBy, quoted } = message

		const users = await this.usersRepository.findManyByIds({
			userIds: this.formatUsersIds([
				sentBy?.ssoId,
				revokedBy?.ssoId,
				quoted?.sentBy?.ssoId,
				quoted?.revokedBy?.ssoId,
			]),
		})

		return this.getRawMessageFromPrismaMessageAndUsers({ message, users })
	}

	async getRawPrivateMessage(
		message: PrismaMessage,
	): Promise<RawPrivateMessage> {
		return this.getRawMessage(message)
	}

	async getRawGroupMessage(message: PrismaMessage): Promise<RawGroupMessage> {
		return this.getRawMessage(message) as Promise<RawGroupMessage>
	}

	async getRawMessages(
		messages: PrismaMessage[],
	): Promise<(RawPrivateMessage | RawGroupMessage)[]> {
		const usersIds = messages.flatMap(({ sentBy, revokedBy }) => [
			sentBy?.ssoId,
			revokedBy?.ssoId,
		])

		const users = await this.usersRepository.findManyByIds({
			userIds: this.formatUsersIds(usersIds),
		})

		const raw = messages.map((message) =>
			this.getRawMessageFromPrismaMessageAndUsers({ message, users }),
		)

		return raw
	}
}
