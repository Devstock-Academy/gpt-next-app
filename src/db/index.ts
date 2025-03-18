import type { Chat, ChatWithMessages, Message } from '../types'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createChat(
  userEmail: string,
  name: string,
  msgs: Message[]
) {
  const chat = await prisma.chat.create({
    data: {
      userEmail,
      name,
      messages: {
        create: msgs.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      },
    },
  })

  return chat.id
}

export async function getChats(userEmail: string): Promise<Chat[]> {
  const chats = await prisma.chat.findMany({
    where: { userEmail },
  })
  return chats
}

export async function getChat(
  chatId: number
): Promise<ChatWithMessages | null> {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: { messages: true },
  })

  return chat as ChatWithMessages
}

export async function getChatsWithMessages(
  userEmail: string
): Promise<ChatWithMessages[]> {
  const chatsWithMessages = await prisma.chat.findMany({
    where: { userEmail },
    include: { messages: true },
    orderBy: { timestamp: 'desc' },
    take: 3,
  })

  return chatsWithMessages as ChatWithMessages[]
}

export async function getMessages(chatId: number): Promise<Message[]> {
  const messages = await prisma.message.findMany({
    where: { chatId },
  })

  return messages as Message[]
}

export async function updateChat(
  chatId: number,
  msgs: { role: string; content: string }[]
) {
  await prisma.message.deleteMany({ where: { chatId } })

  await prisma.message.createMany({
    data: msgs.map((msg) => ({
      chatId,
      role: msg.role,
      content: msg.content,
    })),
  })
}
