export interface Chat {
  id: number
  name: string
  userEmail: string
  timestamp: Date
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface StoredMessage extends Message {
  id: number
  chatId: number
}

export interface ChatWithMessages extends Chat {
  messages: StoredMessage[]
}
