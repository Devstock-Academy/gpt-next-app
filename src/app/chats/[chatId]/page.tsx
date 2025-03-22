import Chat from '@/components/Chat'
import { redirect, notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { getChat } from '@/db'

export default async function ChatDetail({
  params,
}: {
  params: { chatId: string }
}) {
  const { chatId } = await params

  const chat = await getChat(+chatId)
  if (!chat) {
    return notFound()
  }

  const session = await getServerSession()
  if (!session || session?.user?.email !== chat?.userEmail) {
    return redirect('/')
  }

  return (
    <main className='pt-5'>
      <Chat id={+chatId} key={chatId} messages={chat?.messages || []} />
    </main>
  )
}
