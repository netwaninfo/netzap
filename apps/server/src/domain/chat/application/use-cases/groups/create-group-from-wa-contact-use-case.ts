import { type Either, failure, success } from '@/core/either.js'
import { Group } from '@/domain/chat/enterprise/entities/group.js'
import type { WAGroupContact } from '@/domain/chat/enterprise/entities/wa/group/contact.js'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error.js'
import { Injectable } from '@nestjs/common'
import { GroupsRepository } from '../../repositories/groups-repository.js'

interface CreateGroupFromWAContactUseCaseRequest {
  waContact: WAGroupContact
}

type CreateGroupFromWAContactUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    group: Group
  }
>

@Injectable()
export class CreateGroupFromWAContactUseCase {
  constructor(private groupsRepository: GroupsRepository) {}

  async execute(
    request: CreateGroupFromWAContactUseCaseRequest
  ): Promise<CreateGroupFromWAContactUseCaseResponse> {
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
