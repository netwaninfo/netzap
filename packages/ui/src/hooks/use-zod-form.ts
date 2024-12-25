import { zodResolver } from '@hookform/resolvers/zod'
import { type UseFormProps, type UseFormReturn, useForm } from 'react-hook-form'
import type { ZodSchema, z } from 'zod'

type FormProps<Schema extends ZodSchema> = Omit<
  UseFormProps<z.input<Schema>>,
  'resolver'
>

interface UseZodFormProps<Schema extends ZodSchema> extends FormProps<Schema> {
  schema: Schema
}

type UseZodFormReturn<Schema extends ZodSchema> = UseFormReturn<
  z.input<Schema>,
  unknown,
  z.output<Schema>
>

function useZodForm<Schema extends ZodSchema>({
  schema,
  ...props
}: UseZodFormProps<Schema>): UseZodFormReturn<Schema> {
  return useForm<z.input<Schema>, unknown, z.output<Schema>>({
    ...props,
    resolver: zodResolver(schema),
  })
}

export { useZodForm, type UseZodFormReturn }
