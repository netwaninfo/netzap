'use client'

import { Send } from 'lucide-react'
import { z } from 'zod'

import { remeda } from '@/lib/remeda'

import { useSocketContext } from '@/app/wa/[instanceId]/providers/socket-provider'
import { useChatParams } from '@/hooks/use-chat-params'
import { useZodForm } from '@netzap/ui/hooks/use-zod-form'

import { useSocketEmitter } from '@/hooks/socket/use-socket-emitter'
import { Button } from '@netzap/ui/components/button'
import { Form, FormField } from '@netzap/ui/components/form'
import { Input } from '@netzap/ui/components/input'

const formSchema = z.object({
  body: z.string().refine(value => !remeda.isEmpty(value.trim())),
})

export function PageFooter() {
  const socket = useSocketContext()
  const handleEmitMessageSendText = useSocketEmitter(
    socket,
    'message:send:text'
  )

  const { waChatId } = useChatParams()

  const formProps = useZodForm({
    schema: formSchema,
    defaultValues: {
      body: '',
    },
  })

  const { control, handleSubmit, reset } = formProps

  function handleSendMessage(data: z.output<typeof formSchema>) {
    const { body } = data

    handleEmitMessageSendText({ body, waChatId })
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
