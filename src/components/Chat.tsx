'use client'
import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getCompletion } from '@/server-actions/getCompletion'
import { useRouter } from 'next/navigation'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chat({
  id = null,
  messages: initialMessages = [],
}: {
  id?: number | null
  messages?: Message[]
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [message, setMessage] = useState('')

  const chatId = useRef<number | null>(id)

  const router = useRouter()

  const onClick = async () => {
    const completions = await getCompletion(chatId.current, [
      ...messages,
      { role: 'user', content: message },
    ])

    if (!chatId.current) {
      router.push(`/chats/${completions.id}`)
      router.refresh()
    }
    chatId.current = completions.id

    setMessage('')
    setMessages(completions.messages)
  }

  return (
    <div className='flex flex-col'>
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`mb-5 flex flex-col ${
            msg.role === 'user' ? 'items-end' : 'items-start'
          }`}
        >
          <div
            className={`${
              msg.role === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            } rounded-md py-2 px-8`}
          >
            {msg.content}
          </div>
        </div>
      ))}

      <div className='flex border-t-2 border-gray-300 pt-3 mt-3'>
        <Input
          className='flex-grow text-xl'
          placeholder='Zadaj pytanie...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') onClick()
          }}
        />
        <Button onClick={onClick} className='ml-3 text-xl'>
          Wyślij
        </Button>
      </div>
    </div>
  )
}
