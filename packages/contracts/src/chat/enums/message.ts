import z from 'zod'

export const messageTypeSchema = z.enum([
  'text',
  'audio',
  'voice',
  'image',
  'video',
  'document',
  // 'sticker',
  'vcard',
  'multi_vcard',
  'revoked',
  'unknown',
])

export type MessageType = z.infer<typeof messageTypeSchema>

export const messageStatusSchema = z.enum([
  'error',
  'pending',
  'sent',
  'read',
  'played',
])

export type MessageStatus = z.infer<typeof messageStatusSchema>
