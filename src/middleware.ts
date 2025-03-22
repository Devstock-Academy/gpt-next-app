// inside src/middleware.ts
export { default } from 'next-auth/middleware'

export const config = { matcher: ['/chats/:chatid*'] }
