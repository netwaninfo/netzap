import { netzapAPI } from '@/services/container'
import { RedirectType, redirect } from 'next/navigation'

export default async function WAOverviewPage() {
  const { data: user } = await netzapAPI.users.getMe()

  const firstInstanceId = user.instances.at(0)
  if (!firstInstanceId) {
    return redirect('/', RedirectType.replace)
  }

  return redirect(`/wa/${firstInstanceId}/chats`, RedirectType.replace)
}
