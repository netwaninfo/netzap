import { usersAPI } from '@/services/netzap/container'
import { cookies } from 'next/headers'
import { RedirectType, redirect } from 'next/navigation'

export default async function WAOverviewPage() {
  const user = await usersAPI.getMe()

  const firstInstanceId = user.instances.at(0)
  if (!firstInstanceId) {
    const cookiesRef = await cookies()

    for (const cookie of cookiesRef.getAll()) {
      cookiesRef.delete(cookie.name)
    }

    return redirect('/', RedirectType.replace)
  }

  return redirect(`/wa/${firstInstanceId}/chats`, RedirectType.replace)
}
