import { type Either, failure, success } from '@/core/either'
import { Group } from '@/domain/chat/enterprise/entities/group/group'
import type { WAGroupContact } from '@/domain/chat/enterprise/entities/wa/group/contact'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { GroupsRepository } from '../../repositories/groups-repository'

interface CreateGroupFromWAContactRequest {
	waContact: WAGroupContact
}

type CreateGroupFromWAContactResponse = Either<
	ResourceAlreadyExistsError,
	{
		group: Group
	}
>

export class CreateGroupFromWAContact {
	constructor(private groupsRepository: GroupsRepository) {}

	async execute(
		request: CreateGroupFromWAContactRequest,
	): Promise<CreateGroupFromWAContactResponse> {
		const { waContact } = request

		const someGroup =
			await this.groupsRepository.findUniqueByWAGroupIdAndInstanceId({
				instanceId: waContact.instanceId,
				waGroupId: waContact.id,
			})

		const hasSomeGroup = !!someGroup
		if (hasSomeGroup) {
			return failure(new ResourceAlreadyExistsError({ id: waContact.ref }))
		}

		const group = Group.create({
			instanceId: waContact.instanceId,
			name: waContact.defaultName,
			waGroupId: waContact.id,
			imageUrl: waContact.imageUrl,
		})

		await this.groupsRepository.create(group)

		return success({ group })
	}
}
