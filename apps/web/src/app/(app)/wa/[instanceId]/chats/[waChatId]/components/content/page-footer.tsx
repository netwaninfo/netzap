'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useChatParams } from '@/hooks/use-chat-params'
import { useSocketContext } from '../../../../providers/socket-provider'

const formSchema = z.object({ body: z.string().refine(value => value.trim()) })

export function PageFooter() {
  const { socket } = useSocketContext()
  const { waChatId } = useChatParams()

  const formProps = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: '',
    },
  })

  const { control, handleSubmit, reset } = formProps

  function handleSendMessage(data: z.output<typeof formSchema>) {
    const { body } = data

    socket?.emitWithAck('message:send:text', { body, waChatId })
    reset()
  }

  return (
    <Form {...formProps}>
      <form
        className="flex items-center space-x-2"
        onSubmit={handleSubmit(handleSendMessage)}
      >
        <FormField
          control={control}
          name="body"
          render={({ field }) => (
            <Input placeholder="Mensagem" autoComplete="off" {...field} />
          )}
        />

        <Button type="submit" size="icon">
          <Send />
        </Button>
      </form>
    </Form>
  )
}
