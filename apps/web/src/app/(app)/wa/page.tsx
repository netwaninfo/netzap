import { Suspense } from 'react'

import { Code, H3, Paragraph } from '@/components/custom/typography'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { netzapAPI } from '@/services/container'
import { RedirectType, redirect } from 'next/navigation'
import { InstanceListSkeleton } from './components/instance-list-skeleton'
import { InstancesList } from './components/instances-list'

export default async function WAOverviewPage() {
  const { data: user } = await netzapAPI.users.getMe()

  const hasSomeInstance = !!user.instances.length
  if (!hasSomeInstance) {
    return redirect('/auth/sign-out', RedirectType.replace)
  }

  const hasOnlyOneInstance = user.instances.length === 1
  const firstInstanceId = user.instances.at(0)

  if (hasOnlyOneInstance && firstInstanceId) {
    return redirect(`/wa/${firstInstanceId}/chats`, RedirectType.replace)
  }

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <H3 className="text-2xl font-bold text-center">
            Bem-vindo(a), {user.name}!
          </H3>

          <Paragraph className="text-center text-muted-foreground leading-normal">
            Selecione abaixo um{' '}
            <Code className="text-emerald-600">WhatsApp</Code> para continuar.
          </Paragraph>
        </CardHeader>

        <CardContent>
          <ul className="space-y-2">
            <Suspense
              fallback={<InstanceListSkeleton amount={user.instances.length} />}
            >
              <InstancesList />
            </Suspense>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
