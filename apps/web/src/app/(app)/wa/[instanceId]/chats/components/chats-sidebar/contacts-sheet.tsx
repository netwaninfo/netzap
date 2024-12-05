'use client'

import { useDebounce } from '@uidotdev/usehooks'
import { BookUser, Search } from 'lucide-react'

import { InputGroup, InputLeftAddon } from '@/components/custom/input-group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollAreaViewport } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ChangeEvent, Suspense, useState } from 'react'
import { ContactsList } from './contacts-list'
import { ContactsListSkeleton } from './contacts-list-skeleton'

export function ContactsSheet() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <BookUser />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col pb-0">
        <SheetHeader>
          <SheetTitle>Nova conversa</SheetTitle>
          <SheetDescription>
            Procure e seleciona um contato para iniciar uma nova conversa.
          </SheetDescription>

          <InputGroup>
            <InputLeftAddon>
              <Search className="size-4 text-muted-foreground" />
            </InputLeftAddon>

            <Input
              className="pl-8"
              placeholder="Pesquise o nome ou número"
              onChange={handleChangeInput}
              value={search}
            />
          </InputGroup>
        </SheetHeader>

        <div className="min-h-0 flex-1 -my-2 -ml-3 -mr-6">
          <ScrollArea className="h-full">
            <ScrollAreaViewport>
              <div className="space-y-1 pb-6 pr-4">
                <Suspense fallback={<ContactsListSkeleton />}>
                  <ContactsList search={debouncedSearch} />
                </Suspense>
              </div>
            </ScrollAreaViewport>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
