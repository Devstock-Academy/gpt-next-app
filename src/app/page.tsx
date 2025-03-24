import Chat from '@/components/Chat'
import { Separator } from '@/components/ui/separator'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import PreviousChats from '@/components/PreviousChats'

export default async function Home() {
  const session = await getServerSession()

  return (
    <main className='p-5'>
      <h1 className='text-4xl font-bold'>Witaj w aplikacji GPT Chat</h1>
      {!session?.user?.email && (
        <div>Musisz się zalogować, aby korzystać z chatu.</div>
      )}
      {session?.user?.email && (
        <>
          <Suspense fallback={<div>Ładowanie poprzednich rozmów...</div>}>
            <PreviousChats />
          </Suspense>
          <Separator className='my-5' />
          <h4 className='mt-5 text-2xl font-bold'>Rozpocznij nową rozmowę</h4>
          <Chat />
        </>
      )}
    </main>
  )
}
