import { RedirectType, redirect } from 'next/navigation'
import { Suspense } from 'react'

import { api } from '@/services/api/client'

import { Card, CardContent, CardHeader } from '@netzap/ui/components/card'
import { Code, H3, Paragraph } from '@netzap/ui/components/typography'

import { InstancesList } from './components/instance/instances-list'
import { InstancesListSkeleton } from './components/instance/instances-list-skeleton'

export default async function WAOverviewPage() {
  const { data: user } = await api.users.getMe()

  const hasSomeInstance = !!user.instances.length
  if (!hasSomeInstance) {
    return redirect('/auth/sign-out', RedirectType.replace)
  }

  const { data: instances } = await api.instances.fetch({
    query: { page: 1, limit: 2, status: 'connected' },
  })

  const hasOnlyOneInstance = instances.length === 1
  const firstInstanceId = instances.at(0)?.id

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
              fallback={<InstancesListSkeleton amount={instances.length} />}
            >
              <InstancesList />
            </Suspense>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
